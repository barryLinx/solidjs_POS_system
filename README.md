# 點餐 POS 系統

[Demo](https://pos.zeabur.app)

## 登入請使用

- 工號: 100 or 300 ~ 302
- 密碼: 123456
- 30秒後會登出

## 開發環境

- vscode
- vite 5.0.8

## 參考來源

- [webUI-POS-System-for-Coffee-Shop](https://dribbble.com/shots/15629660-Kopinan-POS-System-for-Coffee-Shop)

## 使用程式

>後端

- fastify nodejs 1.8.7
  
>前端

- solidjs v1.8.7
- Bootstrap v5

## 輔助工具

- chatGPT 3.5

## 狀態碼

| 狀態碼 | 註解 |
| -------| ------ |
| 401    |  AccessToken not found  |
| 403    |  禁止  |
| 441    | AccessToken 逾時 , Not Found user, 帳號或密碼錯誤|

## deploy

- vercel

  部屬 fastify
  部屬 json-server

- zeabur

  部屬 solidjs
