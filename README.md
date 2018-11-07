# isElement v1.0.0
요소인지 확인할 수 있습니다.

````
    element || array || object

    or

    {
        element : element || window || document || object || array,
        isInPage : boolean,
        isIncludeWindow : boolean,
		isIncludeDocument : boolean
        isMatch : boolean
    }
````

이름 | 형태 | 설명
| :-- | :-- | :-- |
element | element \|\| window \|\| document \|\| jQueryElement \|\| array | 요소
isInPage | boolean | 요소가 화면상에 있는지 확인에 대한 여부입니다.
isIncludeWindow | boolean | window를 요소에 포함시킬지에 대한 여부입니다.
isIncludeDocument | boolean | document를 요소에 포함시킬지에 대한 여부입니다.
isMatch | boolean | 요소가 여러 개일 경우 전부 일치에 대한 여부입니다.