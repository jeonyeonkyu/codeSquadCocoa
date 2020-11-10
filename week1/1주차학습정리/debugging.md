# 디버깅

  
-   breakpoints란<br/>
	**브레이크포인트**(breakpoint), **중단점**, **중지점**은 [소프트웨어 개발](https://ko.wikipedia.org/wiki/%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4_%EA%B0%9C%EB%B0%9C "소프트웨어 개발")에서 [프로그램](https://ko.wikipedia.org/wiki/%EC%BB%B4%ED%93%A8%ED%84%B0_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8 "컴퓨터 프로그램")을 의도적으로 잠시 또는 아예 멈추게 하는 장소를 가리키며 [디버깅](https://ko.wikipedia.org/wiki/%EB%94%94%EB%B2%84%EA%B7%B8 "디버그") 목적으로 넣는 것이다.
-   watch사용법<br/>
	특정 변수나 객체의 값을 등록해 놓고 변화되는 값을 관찰할 수 있습니다. 특히 스텝 기능을 사용할 때 유용합니다.
	
	사용법은 vscode 기준 브레이크포인트영역에서 오른쪽 클릭 후 로그지점 추가 버튼 누른 후 {...} 안에 변수를 사용해서 디버그 콘솔에 찍어서 관찰할 수 있다         ///////////////이게 watch가 맞는지 확실하지 않음 
	
-   call stack 의 의미<br/>
	현재 상태까지 거쳐온 함수를 역순으로 표시해 줍니다. 함수를 더블 클릭하면 해당 소스의 위치로 이동합니다.
-   Step over / Step into/ Step out<br/>
Step over :  함수 단위로 코드를 실행합니다.
Step into : 한 줄씩 코드를 실행합니다. 중간에 함수가 호출되면 해당 함수로 넘어가 코드를 실행합니다.
Step out : 함수에서 나갑니다.