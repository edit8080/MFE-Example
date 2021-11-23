# MFE-Example (with React)

## 1. 개요

본 프로젝트는 Micro FrontEnd를 구성하면서 고민했던 예제와 장단점을 분석·정리한 프로젝트입니다.

해당 예제 프로젝트에서는 프론트엔드 라이브러리로 React를 사용하였습니다.

## 2. 마이크로 프론트엔드란?

마이크로 프론트엔드란 마이크로 서비스의 개념을 프론트엔드에서 활용하는 기법으로, 구성하고자 하는 전체 서비스를 작은 단위로 분할하여 개발한 후 통합하는 방식입니다.

<div style="display:flex; justify-content:center;">
  <image src="https://user-images.githubusercontent.com/30149272/143044516-0cd82b8c-77c1-48e9-84b4-65d307a2b2ed.png" />
</div>



이를 통해 얻을 수 있는 장점은 다음과 같습니다.

- 업무 분담을 효율적으로 수행 가능
- 분리 배포가 용이, 보다 작은 단위로 테스트 수행 가능.
- 다양한 프론트엔드 프레임워크에 관계없이 통합 가능.

## 3. 마이크로 프론트엔드 통합 방법

### Build-time integration
  통합적으로 빌드하여 활용하는 기법으로 주로 부분 컴포넌트를 패키지로 배포한 후 통합하는 기법을 활용합니다.
  ```json
  {
    "name": "@feed-me/container",
    "version": "1.0.0",
    "description": "A food delivery web app",
    "dependencies": {
      "@feed-me/browse-restaurants": "^1.2.3",
      "@feed-me/order-food": "^4.5.6",
      "@feed-me/user-profile": "^7.8.9"
    }
  }
  ```
  
### Run-time integration

실행 단계에서 외부 모듈을 불러와 통합합니다.

#### 1. by JavaScript

단위 애플리케이션 번들을 `<script>` 태그로 통합 다운로드

```html
<html>
  <head>
    <title>Feed me!</title>
  </head>
  <body>
    <h1>Welcome to Feed me!</h1>

    <!-- These scripts don't render anything immediately -->
    <!-- Instead they attach entry-point functions to `window` -->
    <script src="https://browse.example.com/bundle.js"></script>
    <script src="https://order.example.com/bundle.js"></script>
    <script src="https://profile.example.com/bundle.js"></script>

    <div id="micro-frontend-root"></div>

    <script type="text/javascript">
      // These global functions are attached to window by the above scripts
      const microFrontendsByRoute = {
        '/': window.renderBrowseRestaurants,
        '/order-food': window.renderOrderFood,
        '/user-profile': window.renderUserProfile,
      };
      const renderFunction = microFrontendsByRoute[window.location.pathname];

      // Having determined the entry-point function, we now call it,
      // giving it the ID of the element where it should render itself
      renderFunction('micro-frontend-root');
    </script>
  </body>
</html>
```
  
#### 2. Web Components

HTML 커스텀 엘리먼트를 사용해 통합
  
```html
<html>
  <head>
    <title>Feed me!</title>
  </head>
  <body>
    <h1>Welcome to Feed me!</h1>

    <!-- These scripts don't render anything immediately -->
    <!-- Instead they each define a custom element type -->
    <script src="https://browse.example.com/bundle.js"></script>
    <script src="https://order.example.com/bundle.js"></script>
    <script src="https://profile.example.com/bundle.js"></script>

    <div id="micro-frontend-root"></div>

    <script type="text/javascript">
      // These element types are defined by the above scripts
      const webComponentsByRoute = {
        '/': 'micro-frontend-browse-restaurants',
        '/order-food': 'micro-frontend-order-food',
        '/user-profile': 'micro-frontend-user-profile',
      };
      const webComponentType = webComponentsByRoute[window.location.pathname];

      // Having determined the right web component custom element type,
      // we now create an instance of it and attach it to the document
      const root = document.getElementById('micro-frontend-root');
      const webComponent = document.createElement(webComponentType);
      root.appendChild(webComponent);
    </script>
  </body>
</html>
```

## 4. 참고 자료

- https://martinfowler.com/articles/micro-frontends.html#Run-timeIntegrationViaJavascript
- https://github.com/module-federation/module-federation-examples
