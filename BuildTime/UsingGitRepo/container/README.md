# BuildTime Integration (with Git Repo)

## 1. 방법

부분 컴포넌트를 패키지로 배포하여 사용하지 않고, package.json에서 Git Repo를 명시하여 사용하는 방식을 고민

```
"dependencies": {
    ...
    "project-header": "https://github.com/edit8080/project-header",
    "prject-main": "https://github.com/edit8080/project-main",
    "project-footer": "https://github.com/edit8080/project-footer"
},
```

## 2. 장단점 분석

#### 장점
- 패키지를 npm 상에 배포해야하는 고민이 필요 없음
- 구성 후 빠른 적용이 가능

#### 단점
- Git Repo를 단순히 import하여 사용하면 필요한 패키지 파일이 없으므로 이를 위한 컴파일(babel), 번들링(webpack) 구성이 필요
- 수동으로 버전을 설정해야함
- 각 프로젝트 간에 중복되는 모듈이 과도하게 발생하여 이를 통합하는 메인 컨테이너를 번들링했을 때 용량이 매우 커질 수 있음