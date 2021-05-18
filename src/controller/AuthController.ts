import { Get, ExpressMiddlewareInterface, Post, Controller } from "routing-controllers";
// import {Service} from "typedi";

@Controller()
// @Service()
export class AuthController {
  // 지하철에서 든 생각
  /* 레이어 간에 필요한 객체들을 Bean으로 주입하기 보다는, 같은 객체가 필요하다면,
  * 동일한 객체로 사용하기 위해 Abstarct를 사용하는게 어떨까, 또는 인터페이스?, 예를 들어, Abstract 독뱀이 가지고 있는 메서드인
  * 독을 뿜는다와 독을 삼킨다 메서드를 하나로 규정지어 이것을 구현하거나 이것을 필요로하는 객체에서 의존성을 늘리기보다는,
  * 독뱀 자체를 추상화하고 추상 메서드를 만들어, 이것을 확장해서
  * 각각 필요한 객체에서 extends로 오버라이드해서 사용하자. 그러면 독 객체와 뱀 객체 양 객체 사이의 메서드나 객체 의존도가 많이 줄어들거야.
  * 어차피 추상 클래스인 독뱀 클래스의 기능을 확장해서 사용한 것이므로, 추상 클래스 자체가 바뀌지 않는다면, 양쪽의 기능이 바뀐다 한들 변화가 없기 때문이지.
  * 그렇다면 승하님이 말한 인터페이스로 코딩하라는 말씀은 무엇일까..? 클라이언트의 데이터를 신용할 수 없기 때문에 데이터 포맷이나 타입을 명시하기 위해서 사용하는걸까?
  * 인터페이스 자체는 데이터를 담거나 쓸 수 없어. 이 말은 레이어를 횡단하는 그 무언가 어떤 용어가 이를테면, bounded Context 같은 것을 구현하기 위해서 사용하는건가??
  * 인터페이스를 생각해보자. 인터페이스를 만들고 이것을 구현하면, 반드시 두 객체에선 같은 메서드와 변수를 사용해야만 한다. 이런 용도로 쓰일 수 있는 예가 무엇이 있을까?
  *
  *  */
  @Get("auth")
  async test() {
    return "Hello, World!, This is Auth Controller";
  }

  @Post()
  async login() {}

  @Post()
  async logout() {}

  @Post()
  async requestJwtRefreshToken() {}
  // middleware 고려
}