import { UserLoginRequestDto } from "../../application/dtos/Auth/UserLoginRequestDto";
import { UnauthorizedError } from "routing-controllers";
import { Encryption } from "../../infrastructure/lib/bcrypt/Encryption";
import { UserRepository } from "../../domain/repository/UserRepository";
import { JsonWebToken } from "../../infrastructure/lib/jsonwebtoken/JsonWebToken";
import { Inject, Service } from "typedi";
import { UserLoginResponseDto } from "../../application/dtos/Auth/UserLoginResponseDto";
import { Builder } from "builder-pattern";

@Service()
export class AuthService {
  constructor(
    @Inject("UserRepository") private userRepository: UserRepository,
    @Inject("JsonWebToken") private jwt: JsonWebToken,
    @Inject("Encryption") private encryption: Encryption,
    @Inject("UserLoginResponseDto") private userLoginResponseDto: UserLoginResponseDto
  ) {}


  async login(userLoginDto: UserLoginRequestDto) {
    // dto의 유저 id로 찾은 유저가 dto의 id랑 비밀번호가 맞는지 아닌지부터 확인을 하고,
    // 해당 유저의 디비에 암호화된 패스워드와, salt값이 존재한다. 그럼 복호화해서 이 유저의 plain password랑, dto의 패스워드랑 일치하는지 확인을 하고, id 확인하고,
    // -> Bcrypt 가 단방향 암호화 라이브러리 이기 때문에, 복호화는 불가능하고 저장된 salt 값으로 확인해야함. ->> 이부분 좀 공부를 더 해야할듯.
    // id와 패스워드가 일치하면, 그 다음은 토큰이 있는지 없는지(즉, 최초 로그인 사용자인지 아닌지)를 판단하기 위해서 dto의 token 유무를 확인해야 겠지.
    // 현재 유저가 토큰을 가지고 있는지 아닌지, 그래서 최초 사용자 로그인이라면, 토큰을 부여해주고,
    // 만약 최초가 아니라면, 토큰으로 상호 통신을 하고 있을테니, 해당 유저가 처음 로그인했을 때(토큰이 없을 때) 발급했던 토큰을 dto의 들어온 토큰이랑 확인을 하는거지
    // 그니까, 아직 해당 유저의 토큰 만료는 되지 않았는데, 유저가 로그아웃을 한 경우(여전히 토큰이 유효하다), -> 이 부분은 redis로 해결은 가능한데 한 유저에 대한 token 공유 객체가 될 수 있어서
    // 동시성 문제가 발생할 수 있다. 그리고 클라이언트도 token을 레디스에 저장할텐데..로컬 스토리지와, 쿠키가 아니라, -> 그럼 동일한 redis db에 담아야하는건가? // 일시적 저장소인 캐쉬 저장소에 올려두는게 맞다고 본다.
    // 내가 최초에 발급한 토큰을 따로 저장을 해두어야하는데, 토큰은 일시적 만료일을 가지고 있기 떄문에, RDBMS를 사용해서 저장해두면 나중에 문제가 생겨, 이것을 해결하기 위해,
    // 일시적 오브젝트를 사용하는 Redis를 공부해야할 것 같다. 현재 이것말곤 다른 대안이 없어. 그럼 또 스키마 내렸다 올려야하나, sequelize: false로 바꾸는거 잊지말고(= prod)
    // 토큰을 복호화했을 때, 내가 발급했던 토큰과 일치하면 들어온 dto의 토큰을 그대로 다시 보내주면서, 인증이 되었다고 이야길 해주면 되는거지. -> Response 데이터를 만들어서 보내줘야지.
    // 만약 accessToken의 기한이 만료되면, RefreshToken으로 access Token을 발급해야한다고, client에 보내줘야지. 그럼 최초에 jwt 발급할떄 refeshtoken의 만료일을 길게 잡고 같이 보내줘야지.
    // RefreshRequestDto의 대한 함수를 따로 짜서, RefreshToken을 기반으로 accessToken을 다시 발급해서 보내주고 통신은 accessToken으로 하는거지.
    // 그리고 SOLID 원칙에 준수하여 로직이 너무 커질 경우 하나의 User/UserUsecase/Login()로 분리를 해서 관리를 하면 되겠다. UserService의 규모 확장과, 유연성에도 도움이 될 수 있도록
    // service의 단위가 아니라, useCase의 단위로 움직이게 될까?
    // 문제는 class-validator와, class-transformer야, 이것의 역할과 책임 등을 모르니까 에러가 발생해도 추적할수가 없다. redis 연동하고 로직짜고 fixing 해보자
    // 그럼 최초 로그인 사용자가 아니라는 점에서 모든 api 로직에 토큰을 부여해야할까? 아니면 dto의 validateStatus: true 라는 것을 줘서, api 인증방식에서 사용해야할까?
    // middleware를 사용해야할까? auth middleware 필터 작용을 하는
    // 토큰의 유무와 관계없이 로그인 시 아이디와 비밀번호를 조회해서 둘 중 하나가 없으면 바로 return 404를 해주면 됨. 토큰의 로직은 그 이후에 발생해도 됌.
    // 그러면 기존에 로그인 로직이 로그인(비밀번호, id) 조회 + 토큰 작업이니까, controller -> 유저 인증(객체) -> jwt 토큰 유무에 따른, 로그인 성공여부의 객체를 따로 분리해서 만들어야할까를 고민
    // https://codahale.com/a-lesson-in-timing-attacks/ -- 타이밍 어택

    const user = await this.userRepository.findOneUserForLogin(userLoginDto); // 이메일을 통해 유저를 가져오는 함수여야 한다.
    const isEqualUser: boolean = await this.encryption.verifyPassword(userLoginDto.getUserPassword, user.getUserPassword);

    if (!user) {
      return { status: 404, message: "회원가입이 필요하거나, 조회된 아이디가 없습니다." };
    } else if (user && !isEqualUser) {
      return { status: 401, message: "아이디나 비밀번호가 틀립니다." };
    }

    if (user && isEqualUser && userLoginDto.getUserToken === undefined) { // 최초 로그인 사용자일 때,
      const accessToken = await this.jwt.generateJwtToken(userLoginDto);
      const refreshToken = await this.jwt.generateJwtRefreshToken(userLoginDto);
      // redis에 키와 밸류:토큰을 저장할 생각하고 있어야함
      return Builder<UserLoginResponseDto>()
        .setUserId(user.getUserId)
        .setUserEmail(user.getUserEmail)
        .setAccessToken(accessToken)
        .setRefreshToken(refreshToken)
        .build();
    }

    if (user && isEqualUser && userLoginDto.getUserToken !== undefined) { // 최초 로그인 사용자가 아닐 때,
      const token: string = userLoginDto.getUserToken;
      const verifyUser: boolean = await this.jwt.verify(token);
      // redis에 키와 밸류:토큰을 저장할 생각하고 있어야함
      if (verifyUser) {

      }


    }







    // const isPasswordEqual = await this.encryption.verifyPassword(
    //   userLoginDto.getPassword,
    //   getPasswordExtractedByUsert
    // );
    //
    // if (isPasswordEqual) {
    //   const token = this.jwt.generateJwt(getUserIntoDatabase);
    //   const refreshToken = this.jwt.generateRefreshJwtToken(getUserIntoDatabase);
    //   return { status: 200, user: { getUserIntoDatabase }, token: { accessToken: token, refreshToken: refreshToken} }
    // } else {
    //   throw new UnauthorizedError("Password Incorrect..");
    // }

  }

  async logout() {
    // Redis 를 통해 expire time 고려해서 자동으로 삭제되도록 조정하는 것.

  }



}