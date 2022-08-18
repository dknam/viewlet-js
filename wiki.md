<p align="center" width="100%">
    <img width="60%" src="https://github.com/dknam/viewlet-js/raw/main/docs/images/viewletjs-logo3.png"> 
</p>

<br/>
<br/>

# 1. Overview



## 1.1. 용어 정의

### ViewletJS

다양한 형태의 유저 인터페이스를 구성하기 위한 Javascript Framework


### ViewletContainer

ViewletJS에서 제공하는 Main Container이다. 화면에 랜더링 될 영역을 표시합니다(viewport)

ViewletJS는 ViewletContaienr를 통해 Alert, Confirm, Layer등과 같은 기본 UI 기능을 제공합니다.

ViewletContainer는 React와 React-Redux로 개발 됩니다.


### Viewlet

독립성을 가진 유저 인터페이스의 최소 단위입니다.

각 viewlet은 다양한 형태의 라이브러리를 이용하여 개발 가능하며, ViewletContainer에 의해 화면에 배치됩니다.

### Viewer

ViewletContainer와 Viewlet을 연결하는 물리적인 인터페이스 역할을 합니다.

ViewletContainer는 Viewer를 통해 각 Viewlet을 배치하고, Viewlet은 Viewer를 통해서 랜더링 됩니다.

Viewer는 React로 개발된 Component입니다.

### ApplicationContext

ViewletJS의 global context이며, application 단위의 bean container 역할을 합니다.

### ViewletContext

Viewlet 단위의 context이며 주로 Viewlet 단위의 bean container 역할을 합니다.

ApplicationContext를 통해 생성 됩니다.

<br/>
<br/>

## 1.2. 기능 명세

### 1.2.1 ViewletJS는 여러 Viewlet을 자유롭게 배치할 수 있습니다.

ViewletJS는 SingleView, SplitView, EmbededView, PopupView등을 지원 합니다.

<p align="" width="100%">
    <img width="80%" src="https://github.com/dknam/viewlet-js/raw/main/docs/images/viewletjs-viewconcept.png"> 
</p>


<br/>
<br/>

### 1.2.2 ViewletJS는 기본 UI 기능을 제공 합니다.

ViewletJS는 기본 UI 기능을 포함하고 있습니다. 

ViewletJS의 UI 모듈은 ReactJS로 개발되었으며 각 Viewlet은 Viewlet-UI-Handler 모듈을 통해 기본적인 UI 기능을 사용 할수 있습니다.

<p align="" width="100%">
    <img width="80%" src="https://github.com/dknam/viewlet-js/raw/main/docs/images/viewletjs-ui-handler.png"> 
</p>


<br/>
<br/>

### 1.2.3 Viewlet은 독립적인 랜더링 파이프를 가질수 있습니다.

Viewlet은 IViewletAdoptor 인터페이스를 통해 다양한 형태로 구성할 수 있습니다.

ReactJS, VueJS, HTML등을 사용해 다양한 방법으로 유저 인터페이스를 개발할 수 있습니다.

<p align="" width="50%">
    <img width="30%" src="https://github.com/dknam/viewlet-js/raw/main/docs/images/viewletjs-iviewletadoptor.png"> 
</p>


<br/>
<br/>



# 2. ViewletJS 설계

## 2.1. 역할과 책임

프로그램(로직)을 구현하는 것은 내부와 외부의 경계를 지속적으로 설정해 가는 과정입니다.

배달비를 책정하는 아주 간단한 함수를 하나 예를 들어 보겠습니다.

```ts
function calcDeliveryFee(distance: number, price: number) {
    if (price > 30000) {
        return 0;
    } else {
        return distance * 1000;
    }
}
```

위 함수는 구매한 비용이 30,000원 이상이면 배달비는 무료이고, 그 이하면 1km당 1,000원의 배달비를 책정하는 정책을 구현했습니다.

무료배달 가능한 구매비용의 기준과, km당 배달비 금액은 `calcDeliveryFee` 함수 내부에 정의되어 있습니다.


아주 간단한 함수를 하나 만들더라도 그 함수 내부 로직과 외부 로직에 대한 경계를 정의해야 합니다. 


프레임워크를 개발할 때는 그 내부와 외부에 대한 경계를 설정하는 것이 중요합니다. 



모듈을 설계할때 중요한 것중 하나는 외부로 노출하는 인터페이스를 정의하는 것입니다. 모듈 외부로 노출되는 인터페스는 해당 모듈의 내부와 외부의 경계를 넘나드는 중요한 요소가 됩니다. 따라서 인터페이스를 정의할 때는 모듈 내부에서 알아서 처리해야 할 것과 외부에 의존하여 처리해야 할 것을 명확하게 구분하며 정의 해야 합니다. <ins>모듈의 내부와 외부의 경계를 구분하는 것은 곧 해당 모듈의 역할과 책임에 대해 정의하는 것과 같습니다.</ins> 책임과 역할에 대해 명확하게 정의된 모듈은 어떤 환경에서도 잘 동작하게 될것 입니다. ViewletJS의 외부 인터페이스를 설계하면서 ViewletJS의 역할과 책임에 대해 정의해 봅시다.


<br/>
<br/>

## 1.1. 기본 구조

가장 일반적으로 생각 할수 있는 모듈의 외부 인터페이스 구조는 아마 모듈을 로딩하고 해당 모듈을 실행하면서 필요한 옵션정보를 전달하는 형태의 구조일 것입니다.

우리가 만들려고 하는 ViewletJS를 빗대어 pseudocode를 작성해보면 아래와 같을 것입니다.

```ts
function bootstrap() {
    const app = new viewletjs.application("#container")
    app.load();  //ViewletContainer 로드
}
bootstrap();
```

보통 우리는 위 코드를 보면 아래와 같은 예상을 합니다.
1. 실행 중인 document에는 `container`라는 id를 가진 HTMLElement가 존재 할 것이다.
2. ViewletJS는 `#container`라는 요소를 찾아서 내부에 정의된 로직에 의해 해당 모듈을 랜더링 할 것이다.

일반적인 상황에서 위 코드는 우리의 예상대로 잘 동작할 것입니다.

<br/>
<br/>

그리고 위 코드는 자연스럽게 ViewletJS의 역할과 책임에 대한 정의를 하고 있습니다.

<p align="center" width="100%">
    <img width="80%" src="https://github.com/dknam/viewlet-js/raw/main/docs/images/module_internal.png"> 
</p>


1. viewletjs.application 클래스의 생성자
```ts
new viewletjs.application("#container")
```
첫번째 코드에서 viewletjs.application 클래스의 생성자 파라미터로 `#cotainer` 라는 DOM의 id를 전달 함으로써 ViewletContainer가 랜더링될 위치에 대한 결정권은 외부에 있음을 의미합니다.

2. viewletjs.application 인스턴스의 load() 메소드
```ts
app.load()
```
두번째 코드는 `#container` 하위 노드에 ViewletJS 모듈을 로딩하는 것에 대한 책임은 ViewletJS 모듈에 있음을 의미합니다. 그것이 어떠한 방법이던지 외부 영역에서는 관심을 두지 않습니다. 오로지 ViewletJS의 내부에서 모든 것을 결정합니다.

<br/>
<br/>

이와같이 우리는 기본적으로 알게 모르게 내부와 외부의 경계, 책임과 역할에 대한 정의를 내리고 있습니다.

왜냐하면 그것은 프로그램을 만드는 기본적인 원칙이기 때문입니다.

가장 작은 함수 단위의 로직이든, 대규모 어플리케이션의 아키텍처 레벨의 구조이든 그 원칙은 모두 동일합니다.
  
side-effect를 유발하는 특정 환경, 특정 모듈, 특정 로직 대한 의존성을 내부에서 외부로 옮겨김으로써,

좀더 안정적이고 독립적으로 실행되는 좋은 프로그램을 만들수 있습니다.

<br/>
<br/>

좀더 나가서 필요한 주요 로직을 간단하게 구현해 봅시다.

[application.tsx]
```ts
import { ViewletContainer } from "./ViewletContainer";

export class Application {
	constructor(public _container: string) {}

	load() {
		ReactDOM.render(
            document.querySelector(`#${this._container}`), 
            <ViewletContainer />);
	}
}

```

[viewlet_container.tsx]
```ts
import React from "react";

export class ViewletContainer extends React.Component {

    render() {
        return <div>ViewletContainer</div>
    }
}
```

우리의 모듈은 의도한 대로 잘 동작하고 있습니다.

ViewletJS 모듈은 내부적으로 ReactJS를 이용해 ViewletContainer 컴포넌트를 개발하기로 하였고, 사용자가 원하는 위치에 정확하게 랜더링 되어 동작하고 있습니다.

<br/>
<br/>

:worried:그런데..

앞으로 모바일(React-Native)에서도 ViewletJS를 이용해서 개발해야 하는 상황이 발생 했습니다.

과연 지금 우리의 모듈은 모바일에서도 잘 동작 할까요?

<br/>
<br/>

## 1.2. 책임과 역할의 변화

지금까지 우리는 웹 환경에 대한 고려만 하고 모듈을 개발 했습니다.

하지만 이제는 모바일 환경에 대한 고려도 해야만 합니다.

지금의 ViewletJS 코드 내부에는 특정 환경에 종속적인 코드가 있습니다. 

바로 `docuemnt`, `ReactDOM`과 같은 코드 입니다.

해당 코드는 웹 환경에서만 동작합니다.

<ins>이는 더이상 해당 코드를 ViewletJS가 책임질 수 없게 되었음을 의미합니다.</ins>

<ins>ViewletJS 모듈은 모바일에서도 동작 해야 한다는 새로운 요구사항이 추가 되었으므로 그에 따른 역할과 책임에 대한 정의도 달라져야 합니다.</ins>

<br/>
<br/>

## 1.3. 새로운 경계

새로운 요구사항에 의해 ViewletJS의 내부와 




<br/>
<br/>

# 2. 모듈의 구성

ViewletJS는 총 3개의 Mono-Repo로 구성됩니다.

|package|description|
|------|---|
|:open_file_folder: viewlet-application|ViewletJS 구성과 사용을 위한 주요 모듈을 제공하는 패키지|
|:open_file_folder: viewlet-beans|bean을 등록할 수 있는 데코레이터를 제공하는 패키지|
|:open_file_folder: viewlet-ui|Alert, Confirm, Popup frame, Layer와 같은 기본 UIKIT을 제공 하는 패키지|

<br/>
<br/>

## 2.1. :open_file_folder: viewlet-application

application 패키지에는 ViewletJS의 핵심 기능을 담당하는 Core 모듈과 사용자에게 노출 될 주요 인터페이스가 정의 되어 있습니다.

|module|description|
|------|---|
|:page_facing_up: application_context.ts|ViewletJS의 global context입니다. global bean container역할|
|:page_facing_up: viewlet_context.ts|viewlet 단위로 생성. 주로 viewlet 단위의 excutable, service등의 동작을 제어|
|:page_facing_up: application_configurations.ts|ViewletJS의 주요 설정을 위한 helper 모듈|
|:page_facing_up: application.ts|ViewletJS의 entry 포인트이며 사용자에 노출되는 interface를 제공|

<br/>
<br/>

## 2.2. :open_file_folder: viewlet-beans

|module|description|
|------|---|
|:page_facing_up: executable.ts|@executable 데코레이터를 제공하며 executable 모듈을 bean container에 등록|
|:page_facing_up: service.ts|@service 데코레이터를 제공하며 service 모듈을 bean container에 등록|
|:page_facing_up: viewlet.ts|@viewlet 데코레이터를 제공하며 viewlet모듈을 bean container에 등록|
|:page_facing_up: component.ts|@component 데코레이터를 제공하며 component 모듈을 bean container에 등록|

<br/>
<br/>

## 2.2. :open_file_folder: viewlet-ui

ViewletJS는 기본 UI를 제공합니다. 기본 UI는 ReactJS로 개발 되었습니다.


|module|description|
|------|---|
|:open_file_folder: viewlet-ui-component|alert, confirm, button, viewer 같은 기본 UI 컴포넌트|
|:open_file_folder: viewlet-ui-handler|표준 GUI 모듈 제공(IViewletUI)|
|:open_file_folder: viewlet-ui-container|react-redux 기반의 메인 컨테이너 컴포넌트|

<br/>
<br/>


