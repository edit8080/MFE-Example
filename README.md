# MFE-Example (with React)

## 1. 개요

본 프로젝트는 Micro FrontEnd를 구성하면서 고민했던 예제와 장단점을 분석·정리한 프로젝트입니다.

## 2. 마이크로 프론트엔드란?

마이크로 프론트엔드란 마이크로 서비스의 개념을 프론트엔드에서 활용하는 기법으로, 구성하고자 하는 전체 서비스를 작은 단위로 분할하여 개발한 후 통합하는 방식이다.

이를 통해 얻을 수 있는 장점은 다음과 같다.

- 업무 분담을 효율적으로 수행할 수 있다.
- 분리 배포가 용이하고, 보다 작은 단위로 테스트를 수행할 수 있다.
- 다양한 프론트엔드 프레임워크에 관계없이 통합이 가능하다.

## 3. 마이크로 프론트엔드 통합 방법

- Build-time integration : 통합적으로 빌드하여 활용하는 기법으로 주로 부분 컴포넌트를 패키지로 배포한 후 통합하는 기법을 활용한다.

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

- Run-time integration : 실행 단계에서 외부 모듈을 불러와 통합한다.
  - JavaScript : 단위 애플리케이션 번들을 `<script>` 태그로 통합 다운로드
  
  ```javascript
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
  
  - Web Components : HTML 커스텀 엘리먼트를 사용해 통합
  
  ```javascript
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
