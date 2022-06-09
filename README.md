# captcha-generator

## Installation
Follow the following steps to install and use this repo:
- clone the repo via `git clone` command
- install dependencies in project with `pnpm i` command
- run it using the `pnpm start` command

## Docker
TBD

## Routes
There are 2 basic routes so far:  

### `/captcha`  
Creates a captcha with the specified parameters
There are 3 optional parameters:
- `?language=` specifies the language the voice should use
- `?speed=` specifies the spoken words by the voice
- `?gap=` specifies the length of time between words  
- `?length=` specifieds the number of characters in the captcha
Since the captcha consists of random letters, they are each spoken one at a time by the voice.
  

### `/languages`  
Displays a list of all available languages for the captcha voice