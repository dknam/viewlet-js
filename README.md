<p align="center" width="100%">
    <img width="60%" src="https://github.com/dknam/viewlet-js/raw/main/docs/images/viewletjs-logo3.png"> 
</p>

<br/>
<br/>

# 1. Overview

#### Concept

<ins>`vscode`의 viewlet, slit view등과 같은 Layout System에 영감을 받아 이 프로젝트는 시작 되었습니다.</ins>

<b>[viewlet]</b>

>(computing) In certain content management systems, a region of a page where customizable content can be rendered.<br/><br/>
>(컴퓨팅) 특정 콘텐츠 관리 시스템에서 사용자 지정 가능한 콘텐츠를 렌더링할 수 있는 페이지 영역

vscode를 포함한 대부분의 IDE에서 제공하는 code editor layout 시스템을 web page layout에 적용해보려고 합니다. 

IDE의 code editor는 각 파일의 확장자를 기반으로 서로 다르게 정의된 여러 기능들을 통합하여 관리하고 있습니다. 

ViewletJS는 다양한 방법(ReactJS, VueJS, html등)으로 개발된 웹 페이지를 통합하여 관리(배치, 랜더링등) 할 수 있는 개발 환경을 제공하려 합니다.

<p align="" width="100%">
    <img width="45%" src="https://github.com/dknam/viewlet-js/raw/main/docs/images/viewletjs-concept.png"> 
</p>

<br/><br/>

#### Goal

ViewletJS는 vscode 내부적으로 적용된 여러 패턴과 기법들을 학습하여 실제 프로젝트에 적용해 보는 것을 목표로 합니다.

물론, 추후 학습 수준을 넘어 production 레벨로 발전시켜 나갈 예정입니다. 

그 시작의 첫 번째 목표는 아래와 같습니다.

1. vscode가 제공하는 기본적인 code editor layout management system을 web page layout management system으로 확장해 봅니다.

2. typescript decorator를 활용한 dependency injection 패턴을 구현해 봅니다.

3. Observer 패턴을 활용해 인접한 계층 간의 communication을 위한 push service를 구현해 봅니다.(disposable, observable)

<br/>
<br/>

#### Next Step

위 목표가 달성 되면 웹페이지를 배치, 랜더링 할 수 있는 기본적인 환경이 구성 됩니다.

그 이후는 아래와 같은 단계로 진행해 갈 예정입니다.

1. ViewletService의 고도화 - atomic design pattern 기반의 MetadataViewlet 개발
2. MonoRepo 환경 구성 - viewlet-workbench / viewlet-js / viewlet-platform / viewlet-apps 레파지토리 구성
3. 통합 개발 환경 구축 - 통합 빌더(rollup, webpack), vscode-extension
4. TDD 적용 - [selenuim](https://www.selenium.dev), [Testing Library](https://testing-library.com/), [chai](https://www.chaijs.com)를 활용한 테스트 프레임워크 개발해 보기

<br/>
<br/>

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

