# isElement v1.0.0
요소인지 확인할 수 있습니다.

````
    element || jQueryElement

    or

    {
        element : element || window || document || array || jQueryElement,
        isInPage : boolean,
        include : window || document || array,
        match : boolean
    }
````

이름 | 형태 | 설명
| :-- | :-- | :-- |
element | element \|\| window \|\| document \|\| array \|\| jQueryElement | 요소
isInPage | boolean | 화면 상에 있는 요소에 대한 검사 여부 입니다.
include | window \|\| document \|\| array | window 또는 document를 포함할지에 대한 여부 입니다.
match | boolean | 요소가 여러개일 경우 전부일치에 대한 여부 입니다.