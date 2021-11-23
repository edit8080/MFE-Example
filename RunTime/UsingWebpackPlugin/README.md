# RunTime Integration (with Webpack Plugin)

## 1. 구성 과정

1. 부분 컴포넌트 구성 : 부분 컴포넌트(/rotuer)에서 `react-router-dom` 을 사용해 SPA 라우팅을 구성합니다.
2. Webpack 환경 구성 : Webpack의 Module Federation Plugin을 사용해 구성한 컴포넌트에 접근할 수 있는 지점을 구성합니다.
3. 통합 컴포넌트 구성 : 통합 컴포넌트(/main)에서 부분 컴포넌트를 통합하여 사용하기 위해 `bootstrap.js`를 구성합니다.
4. 부분 컴포넌트 접근 : Webpack의 Module Federation Plugin으로 2번에서 구성한 지점으로 부분 컴포넌트에 접근합니다.
5. 부분 컴포넌트 로딩 : 부분 컴포넌트를 동적으로 로딩해야하므로 `@loadable/component`를 통해 컴포넌트를 로딩합니다. 
6. Mono Repo 실행 환경 구성 : lerna를 활용하여 위에서 구성한 부분 컴포넌트와 통합 컴포넌트를 실행할 수 있는 환경을 구성합니다.

사용한 Webpack Dependency

```
"devDependencies": {
  "babel-loader": "^8.2.3",
  "html-webpack-plugin": "^4.5.0",
  "webpack": "^5.4.0",
  "webpack-cli": "^4.1.0",
  "webpack-dev-server": "^3.11.0"
},
```

## 2. 실행 방법

1. /와 /router, /main 패키지 설치

```bash
UsingWebpackPlugin > yarn
UsingWebpackPlugin/main > yarn
UsingWebpackPlugin/router > yarn
```

2. lerna를 통해 /router와 /main 실행

```bash
UsingWebpackPlugin > yarn start
```

3. localhost:8080에서 라우팅이 정상적으로 수행되는지 확인하기

## 3. 장단점 분석

#### 장점

- 번들 파일을 빌드할 필요없이 Webpack 플러그인이 자동으로 구성
- 부분 컴포넌트를 구성하기 위한 Webpack 설정이 어렵지 않음
- hooks의 자유로운 사용

#### 단점

- Module Federation Plugin에 대한 이해 필요
- Webpack v5 사용 고정

## 4. 구성 모습

