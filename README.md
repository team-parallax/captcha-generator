# captcha-generator

## Available TTS engines

### espeak
- stagnant develop
- GPL3

### espeak-ng
- updated fork of `espeak`
- GPL3

### festival
- unrestricted license
- low amount of preinstalled languages
- german language via IMS no longer available


# Task

Create Docker image with PHP which serves a captcha `SVG` and respective `Audio` and its respective solution (`code`)

the PHP script should be able to serve to a simple http-get request with a JSON like this:
```
{
  data: {
    svg: <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"150\" height=\"50\" viewBox=\"0,0,150,50\"><path fill=\"#333\" d=\"M130.85 21.55L130.84 21.55L130.82 ..." />,
    mp3: "base64-code",
    solution: "abcdef"
  }
}
```

the get request should have the following query parameters:
```
language=de
```
depending on this, the audio is played with a speaker of that language.

use [this library](https://captcha.com/php-captcha.html)
