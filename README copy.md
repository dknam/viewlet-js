
<p align="center" width="100%">
    <img width="60%" src="./docs/images/viewletjs-logo3.png"> 
</p>
<p align="center" width="100%">Persistent UI Framework</p>


<br/>
<br/>

## Prologue

수개월에 걸처 React library를 사용하여 UI Framework를 개발 하였다. 

다양한 컴포넌트는 Atomic Design Pattern을 기반으로 정교하게 설계되었다.

비즈니스 로직의 재활용성을 높이기 위해 redux store를 컴포넌트 밖으로 꺼내 비즈니스 로직(reducer)을 동적으로 주입할 수 있게 되었다.

이로 인해 비즈니스 로직 개발자는 더이상 리액트니, 리덕스니 복잡 다양한 FrontEnd 세계에 대한 이해 없이 비즈니스 로직에 집중 할수 있게 되었다.

UI 비즈니스 로직은 웹서버 없이 개발환경(nodejs)에서 독립적으로 실행되며 TDD를 적용할 수 있게 되었다.

UI Core 로직과 UI 비즈니스 로직을 완전하게 분리하였다.

이로서 목표하던 바를 이루었다!

<br/>
<br/>

그런데..

react보다 훨씬 빠르고 안정적인 라이브러리가 나온다면 어떻게 될까..

프레임워크를 갈아 엎어야 할까?

기존 비즈니스 로직들은 프레임워크가 변경돼도 그대로 동작할까?

새로운 라이브러리를 react와 함께 사용할 수는 없을까?

앞으로 계속 더 좋은 라이브러리가 나올텐데 그때는 또 어떻게 해야 할까?

<br/>
<br/>

>좋은 코드란 한번 작성하고 변경되지 않는 코드가 아니라, 변하는 요구사항을 유연하게 수용할 수 있는 코드이다.<br/><br/>
>마찬가지로 좋은 프레임워크란 특정 플랫폼이나 라이브러리에 의존하기 보다는 다양한 환경하에서 독립적으로 실행될 수 있는 프레임워크일 것이다.

<br/>
<br/>

10년 후에도 생명력을 가지는 Framework를 만들려면 어떻게 해야 할까?

대체 무엇이 변하고 무엇이 변하지 않는 것일까?

Clean Architecture가 지향하는 계층의 분리와 의존성의 규칙을 웹 환경에 어떻게 적용할 수 있을까?

<br/>
<br/>

## Concept

<ins>`vscode`의 viewlet, slit view등과 같은 Layout System에 영감을 받아 이 프로젝트는 시작되었다.</ins>

#### [viewlet]

>(computing) In certain content management systems, a region of a page where customizable content can be rendered.<br/><br/>
>(컴퓨팅) 특정 콘텐츠 관리 시스템에서 사용자 지정 가능한 콘텐츠를 렌더링할 수 있는 페이지 영역

<br/>
<br/>

vscode가 파일의 확장자를 기반으로 각 파일의 확장자에 정의된 프로토콜에 따라 독립적인 기능을 실행하는 것 처럼,

ViewletJS를 통해 다양한 라이브러리로 개발된 여러 페이지를 각각 정의한 파이프라인에 따라 독립적으로 실행하려고 한다.

<p align="center" width="100%">
    <img width="75%" src="./docs/images/viewletjs-concept.png"> 
</p>

<br/><br/>
 
## Goal

ViewletAdoptor를 통해 어떠한 형태의 `viewlet`도 등록, 실행할 수 있다.

각 `viewlet`은 독립적인 랜더링 파이프를 구축 할수 있다(react, vue등)

ViewletJS는 모든 `viewlet`의 생명주기를 제어하며, 자유롭게 `viewlet`을 배치 할수 있다.

ViewletJS에서 제공하는 주요 기능은 각 `viewlet`에 주입되어 재사용 된다.

주요 Business Rule은 각 `viewlet`에 주입되어 재사용 된다.


<br/><br/>


## Practice

### 1. 플랫폼 독립직인 프레임워크 개발을 위한 의존성 주입(dependency injection)에 대한 고찰

여기서의 플랫폼은 넓은 의미로 web, mobile, nodejs등의 javascript 런타임 환경을 의미한다.

우리가 개발한 프레임워크가 플랫폼 독립적으로 동작하려면 어떻게 해야 할까?

각 플랫폼을 초월해서 동작하는 코드를 작성하는 것은 불가능하기 때문에 플랫폼에 종속적인 코드는 외부에서 주입 받아야 한다.

몇가지 주요 모듈을 설계하면서 각 플랫폼 기반의 주요 모듈을 어떻게 프레임워크에 주입하여 사용하는지에 대해 학습해 본다.

<p align="center" width="100%">
    <img width="70%" src="./docs/images/viewletjs-executable.png"> 
</p>

<br/><br/>

### 2. View System 설계 및 개발

Reactjs, Vuejs, Iframe으로 개발된 페이지 또는 컴포넌트를 ViewletJS에 랜더링 하기 위한 View System을 설계해 본다.

각 Viewlet의 Lifecycle을 제아하기 위한 ViewletAdoptor 모듈을 설계한다.

각 Viewlet을 랜더링하고 동작시키기 위한 ViewRenderer 모듈을 개발한다.

각 Viewlet에서 주입될 ViewHandler 모듈(공통 UI 기능 - confirm, alert, openpopup등)을 개발한다.

<p align="center" width="100%">
    <img width="100%" src="./docs/images/viewletjs-viewlet.png"> 
</p>

<br/><br/>

### 3. FileuploadService 개발을 통한 비즈니스 로직과 UI 로직의 격리 방법

보통 파일업로드 기능은 2가지 영역의 로직이 맞물려 동작한다.

1. 업로드 될 파일 목록 표시, 업로드 상태(progress) 표시등 UI를 직접 제어하기 위한 로직
2. 해당 유저의 스토리지 권한체크, 남은 스토리지 용량등 비즈니스 룰에 의거한 로직

첫번쨰 로직은 UI(플랫폼, UI 라이브러리)에 종속적이며 언제든지 환경의 변화에 의해 변경될수 있다.
하지만 두번째 비즈니스 로직은 플랫폼(웹이든, 모바일이든)에 독립적으로 실행되고 유지되어야 한다.

Push([Pull versus Push](https://rxjs.dev/guide/observable#pull-versus-push)) 방식을 기반으로 FileuploadService를 설계하면서 어떻게 하면 비즈니스 로직과 UI로직을 완전히 격리시켜 비즈니스 로직의 재사용성을 높일지에 대해 고민해 본다.


<br/><br/>

### 4. ViewletJS의 개발 및 배포를 위한 개발환경 구성

ViewletJS 프레임워크 개발부터 이를 사용한 비즈니스로직 개발까지의 전체적인 개발 Layer를 구성합니다.

|repository|description|
|------|---|
|[Viewlet-Apps](https://github.com/dknam/viewlet-apps)|비즈니스 레이어|
|[Viewlet-Platform](https://github.com/dknam/viewlet-platform)|플랫폼 기반 모듈|
|[Viewlet-JS](https://github.com/dknam/viewlet-js)|UI 프레임워크|
|[Viewlet-Workbench](https://github.com/dknam/viewlet-workbench)|빌드, 배포, 설정(lint, tsconfig), 테스트등을 위한 통합 개발 환경|



rollup을 통한 iife, umd, cjs등의 모듈 번들링 및 배포 과정을 연습합니다.

vscode-extension을 통해 간단한 통합 개발 환경을 구성하고 배포해 봅니다.

 */
```

