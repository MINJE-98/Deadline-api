# Deadline api V2
NESTJS REST API SERVER

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```

## EndPoint

### Users
POST
​/users
유저 생성

GET
​/users
유저 조회

PATCH
​/users
유저 수정

DELETE
​/users
회원 탈퇴

### Teams
POST
​/teams​/{teamname}
팀 생성

GET
​/teams
팀을 조회

PATCH
​/teams​/{teamid}
팀 정보 수정

DELETE
​/teams​/{teamid}
팀 삭제
### TeamMembers
POST
​/teams​/{teamid}​/teamMembers
팀에 유저 초대

GET
​/teams​/{teamid}​/teamMembers
팀에 가입된 유저 조회

PATCH
​/teams​/{teamid}​/teamMembers
팀에 가입한 유저 수정

DELETE
​/teams​/{teamid}​/teamMembers
팀 탈퇴

DELETE
​/teams​/{teamid}​/teamMembers​/{email}
팀에서 추방

### Items
POST
​/items​/{itemname}
아이템 생성

GET
​/items
아이템 아이템 조회

PATCH
​/items​/{itemid}
아이템 특정 아이템 수정

DELETE
​/items​/{itemid}
아이템 특정 아이템 삭제

### Tags
POST
​/teams​/{teamid}​/tags​/{tagname}
테그 생성

GET
​/teams​/{teamid}​/tags
테그를 조회

PATCH
​/teams​/{teamid}​/tags​/{tagid}
테그 수정

DELETE
​/teams​/{teamid}​/tags​/{tagid}
테그 삭제

### Deadlines
POST
​/teams​/{teamid}​/deadlines
유통기한 등록

GET
​/teams​/{teamid}​/deadlines
등록한 전체 유통기한 조회

PATCH
​/teams​/{teamid}​/deadlines​/{deadlineid}
유통기한 수정

DELETE
​/teams​/{teamid}​/deadlines​/{deadlineid}
유통기한 삭제




