# RunTime Integration (with Bundle File)

## 1. 구성 방법

1. 부분 컴포넌트 구성 : Webpack을 통해 CRA의 기본 페이지에 대해 번들링 파일을 구성합니다.
2. 통합 환경 구성 : Next.js를 통해 구성한 SSR 프로젝트에 위에서 구성한 번들링 파일을 복사하여 저장합니다.
3. 컴포넌트 통합 : [Code Spliting](https://ko.reactjs.org/docs/code-splitting.html)을 통해 번들링 파일을 동적으로 import하여 사용합니다.

사용한 Webpack Dependency

```
"devDependencies": {
  "babel-loader": "8.1.0",
  "css-loader": "5.2.4",
  "mini-css-extract-plugin": "1.3.0",
  "node-sass": "4.14.1",
  "sass-loader": "10.1.1",
  "url-loader": "2.0.0",
  "webpack": "4.44.2",
  "webpack-cli": "3.3.12",
  "webpack-dev-server": "3.11.2"
},
```

## 2. 실행 방법

1. page와 main 패키지 설치

```bash
UsingBundleFile/main > yarn
UsingBundleFile/page > yarn
```

2. /page 빌드
```bash
UsingBundleFile/page > yarn build
```

3. /main의 dist 폴더에 2에서 빌드된 JS와 CSS 파일 복사

4. main 실행
```
UsingBundleFile/main > yarn dev
```

5. localhost:3000/reactPage에서 CRA 기본 페이지가 출력되는지 확인하기

## 3. 장단점 분석

#### 장점

- Webpack 버전 사용이 자유로움
- 번들 파일을 직접적으로 사용하므로 폐쇄망에서 활용 가능

#### 단점

- SSR 환경에 대해 [추가 설정](https://loadable-components.com/docs/server-side-rendering/) 필요
- 초기 window 로딩 순서 문제
- invalid React Hooks 문제로 인해 Hooks 사용 불가
- 용량이 큰 번들 파일을 import 해야함


## 4. 구성 모습
![image](https://user-images.githubusercontent.com/30149272/142804169-7dc0dde8-1bf7-4deb-a95f-90569804ff4b.png)

