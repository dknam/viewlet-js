
## Prologue

수개월에 걸처 React를 기반으로한 UI Framework를 개발 하였다. 

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

기존 프레임워크를 갈아 엎어야 할까?

react와 함께 사용할 수는 없을까?

앞으로 계속 더 좋은 라이브러리가 나올텐데 그때는 또 어떻게 해야 할까?

<br/>
<br/>

>좋은 코드란 한번 작성하고 변경되지 않는 코드가 아니라, 변하는 요구사항을 유연하게 수용할 수 있는 코드이다.<br/><br/>
>마찬가지로 좋은 프레임워크란 특정 플랫폼이나 라이브러리에 의존하기 보다는 다양한 환경하에서 독립적으로 실행될 수 있는 프레임워크일 것이다.

<br/>
<br/>

10년 후에도 생명력을 가지는 Framework를 만들려면 어떻게 해야 할까?

무엇이 변하고 무엇이 변하지 않는 것일까?

Clean Architecture가 지향하는 계층의 분리와 의존성의 규칙을 웹 환경에 어떻게 적용할 수 있을까?

<br/>
<br/>

## ViewletJS

### viewlet

>(computing) In certain content management systems, a region of a page where customizable content can be rendered.<br/><br/>
>(컴퓨팅) 특정 콘텐츠 관리 시스템에서 사용자 지정 가능한 콘텐츠를 렌더링할 수 있는 페이지 영역


<br/><br/>
### Concept

<ins>`vscode`의 viewlet, slit view등과 같은 Layout System에 영감을 받아 이 프로젝트는 시작되었다.</ins>

vscode가 다양한 파일의 확장자를 기반으로 각 파일에 대한 부가 기능들을 독립적으로 싷행하는 것처럼, 

ViewletJS를 통해 다양한 라이브러리로 개발된 각각의 페이지를 독립적으로 실행하고자 한다.

![concept](./docs/images/viewletjs-concept.png)


<br/><br/>
 
### Goal

ViewletAdotor를 통해 어떠한 형태의 `viewlet`도 등록, 실행할 수 있다.

각 `viewlet`은 독립적인 랜더링 파이프를 구축 할수 있다(react, vue등)

ViewletJS는 모든 `viewlet`의 생명주기를 제어하며, 자유롭게 `viewlet`을 배치 할수 있다.

ViewletJS에서 제공하는 주요 기능은 각 `viewlet`에 주입되어 재사용 된다.

주요 Business Rule은 각 `viewlet`에 주입되어 재사용 된다.


<br/><br/>


### Practice

1. 플랫폼 독립적인 ViewletJS 프레임워크의 구조 설계
2. React와 Vue를 이용하여 ReactViewlet, VueViewlet 모듈 개발
3. ReactViewlet, VueViewlet을 이용한 입력 화면 개발[(viewlet-apps)](https://github.com/dknam/viewlet-apps)
4. 파일업로드 기능 개발을 통한 관심사의 분리 방법(ui 로직과 비즈니스 로직의 분리, 의존성 주입)
5. ViewletJS 통합 개발 환경 개발[(Viewlet-Workbench)](https://github.com/dknam/viewlet-workbench)
