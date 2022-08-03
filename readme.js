
// 라이센스 표시하기
// ```ts
// /**
//  * Original Code
//  * https://github.com/vscode/adfdsfdfd.js

// viewlet-application
//	application-context - application 단위의 bean container 역할, 싱글톤
//	application-configuration
//	viewlet-context - viewlet 단위의 컨텍스트 역할, applicationContext에 의해 성성, uiHandler 참조
// viewlet-beans
//	@executable, @viewlet, @service
//	bean-registry
// viewlet-ui
//	viewlet-ui-component - alert, confirm, button, viewer
// 	viewlet-ui-handler - 표준 GUI 모듈 제공(IViewletUI), alert, confirm, viewer, layer
//	viewlet-ui-container - viewer를 배치
//	viewer - viewlet을 로딩하기 위한 물리적인 컴포넌트

// viewlet-ui를 플랫폼별로 외부에서 주입할수 있는 구조
// viewletjs에서 플랫폼별로 제공한다.(web, react-native - javascript runtime 환경만 가능, electron?)

// disposable 모듈 구현
//	- observable를 이용한 옵저버 기반의 이벤트 처리
//	- viewlet의 destroy를 applicationcontext와 해당 viewlet에서 실행중인 executable이 구독한다
//	- 인접한 계정간의 커뮤니케이션, 떨어진 계층간의 커뮤니케이션 방법 차이(observer vs pub/sub)
// external component loading 방식 구현 - 컴포넌트가 다른 모듈(viewlet-apps)에 있다

// generic을 이용한 bean 타입 정의 - const와 inteface를 동시에 정의한다.

// 계층간의 커뮤니케이션
//	인접한 계층 observer - viewlet 종료될때 applicationContext, executable에서 구독하기
//	인접하지 않는 계증 pub/sub - alert ==> alert 컴포넌트와 alert을 호출한 viewlet에서의 커뮤니케이션 


// diagram  viewlet-platform(excutable, viewlet)
// application
// 	vlewletjs 구성을 위한 주요 모듈들이 위치합니다.
//		ApplicationContext - viewletjs의 global context입니다. global bean container역할
//		ViewletContext - viewlet 단위로 생성됩니다. 주로 viewlet 단위의 excutable, service등의 동작을 제어
//		ApplicationConfigurations - viewletjs의 주요 설정을 위한 helper 모듈
//		Application - viewletjs의 entry 포인트이며 사용자에 노출되는 interface를 제공
//	beans
//		bean container에 등록할수 있는 데코레이터를 제공합니다.
//		@executable
//		@viewlet
//		@service
//		@component
//	ui
//	 viewletjs는 alert, confirm, popup frame, layer와 같은 기본 UIKIT을 제공합니다.
//	 기본 UI는 reactjs로 개발되었습니다.

//	application startup
//		create application-context: global context이다. viewlet-renderer(store)를 참조한다.
//		render viewlet-container
//	application route
//		load viewlet