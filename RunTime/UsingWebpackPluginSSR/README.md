# RunTime Integration (with Webpack Plugin & NextJS)

## 1. 구성 과정

1. 부분 컴포넌트 구성 : 부분 컴포넌트(/components)에서 import할 컴포넌트를 구성합니다.
2. Webpack 환경 구성 : [`@telenko/node-mf`](https://github.com/telenko/node-mf) 라이브러리를 사용해 SSR의 NodeJS 환경에서도 ModuleFederation Plugin을 사용하도록 설정합니다.
3. 부분 컴포넌트 서버 실행 : `serve` 라이브러리를 사용해 구성한 부분 컴포넌트를 export 하기 위한 서버를 실행합니다.
4. 부분 컴포넌트 접근 : Webpack의 Module Federation Plugin으로 2번에서 구성한 지점으로 부분 컴포넌트에 접근합니다. 단, NextJS의 서버가 실행되기 전과 후로 나누어 접근 로직을 구성합니다
5. 부분 컴포넌트 로딩 : 사용하고자 하는 부분 컴포넌트를 동적으로 로딩합니다.

부분 컴포넌트에서 사용한 Webpack Dependency

```
"devDependencies": {
  "@babel/core": "7.15.5",
  "@babel/preset-react": "7.14.5",
  "@telenko/node-mf": "0.0.5",
  "babel-loader": "8.2.2",
  "bundle-loader": "0.5.6",
  "css-loader": "6.3.0",
  "html-webpack-plugin": "5.3.2",
  "serve": "13.0",
  "style-loader": "3.3.0",
  "url-loader": "4.1.1",
  "webpack": "5.61.0",
  "webpack-cli": "4.8.0",
  "webpack-dev-server": "4.2.1",
  "webpack-merge": "5.8.0"
},
```

## 2. 실행 방법

1. /components와 /main 패키지 설치

```bash
UsingWebpackPluginSSR/components > yarn
UsingWebpackPluginSSR/main > yarn
```

2. /components 빌드

```bash
UsingWebpackPluginSSR/components > yarn build
```

3. /components 서버 실행

```bash
UsingWebpackPluginSSR/components > yarn start
```

4. /main 서버 실행

```bash
UsingWebpackPluginSSR/components > yarn dev
```

5. localhost:3000 에서 원격으로 가져온 컴포넌트가 정상적으로 렌더링는지 확인

## 3. 장단점 분석

#### 장점

- SSR 환경에서 부분 컴포넌트 import 가능
- Webpack ModuleFederation Plugin 사용 가능

#### 단점

- SSR을 위한 복잡한 설정
- NextJS 서버가 실행되기 전과 후에 대한 처리를 따로 수행해야함
- remoteEntry.js 캐싱 문제 (import 실패 시 이전에 성공한 remoteEntry.js를 가져옴)
