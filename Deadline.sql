-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- SocialAccounts Table Create SQL
CREATE TABLE SocialAccounts
(
    `id`                INT             NOT NULL    AUTO_INCREMENT COMMENT '소셜계정아이디', 
    `uid`               VARCHAR(255)    NOT NULL    COMMENT '소셜계정 uid', 
    `provider`          VARCHAR(30)     NOT NULL    COMMENT '제공자', 
    `refreshToken`      VARCHAR(255)    NOT NULL    COMMENT '리프레쉬토큰', 
    `refreshExpiredAt`  DATETIME        NOT NULL    COMMENT '리프레쉬토큰 만료일자', 
    CONSTRAINT PK_SocialAccount PRIMARY KEY (id)
);


-- Teams Table Create SQL
CREATE TABLE Teams
(
    `id`        INT             NOT NULL    AUTO_INCREMENT COMMENT '팀아이디', 
    `name`      VARCHAR(100)    NOT NULL    COMMENT '팀이름', 
    `createAt`  DATETIME        NOT NULL    COMMENT '팀생성일자', 
    `updateAt`  DATETIME        NOT NULL    COMMENT '팀수정일자', 
    `deleteAt`  DATETIME        NULL        COMMENT '팀삭제일자', 
    CONSTRAINT PK_Teams PRIMARY KEY (id)
);


-- Users Table Create SQL
CREATE TABLE Users
(
    `id`        INT             NOT NULL    AUTO_INCREMENT COMMENT 'ID', 
    `socialID`  INT         NULL     COMMENT 'UID', 
    `name`      VARCHAR(100)    NOT NULL    COMMENT '유저이름', 
    `email`     VARCHAR(100)    NOT NULL    COMMENT '유저이메일', 
    `createAt`  DATETIME        NOT NULL    COMMENT '유저생성일자', 
    `updateAt`  DATETIME        NOT NULL    COMMENT '유저수정일자', 
    `deleteAt`  DATETIME        NULL        COMMENT '유저삭제일자', 
    CONSTRAINT PK_users PRIMARY KEY (id)
);

ALTER TABLE Users COMMENT '유저';

ALTER TABLE Users
    ADD CONSTRAINT FK_Users_socialID_SocialAccounts_id FOREIGN KEY (socialID)
        REFERENCES SocialAccounts (id) ON DELETE SET NULL ON UPDATE CASCADE;


-- Items Table Create SQL
CREATE TABLE Items
(
    `id`         INT             NOT NULL    AUTO_INCREMENT COMMENT '아이템아이디', 
    `teamId`     INT             NOT NULL  DEFAULT 0  COMMENT '팀아이디', 
    `name`       VARCHAR(100)    NOT NULL    COMMENT '아이템이름', 
    `itemImage`  VARCHAR(255)    NOT NULL    COMMENT '아이템이미지', 
    `barcode`    VARCHAR(255)    NOT NULL    COMMENT '아이템바코드', 
    `itemsTag`   VARCHAR(100)    NOT NULL    COMMENT '아이템 테그', 
    `createAt`   DATETIME        NOT NULL    COMMENT '아이템생성일자', 
    `updateAt`   DATETIME        NOT NULL    COMMENT '아이템수정일자', 
    `deleteAt`   DATETIME        NULL        COMMENT '아이템삭제일자', 
    CONSTRAINT PK_Items PRIMARY KEY (id)
);

ALTER TABLE Items
    ADD CONSTRAINT FK_Items_teamId_Teams_id FOREIGN KEY (teamId)
        REFERENCES Teams (id) ON DELETE SET DEFAULT ON UPDATE CASCADE;


-- Tags Table Create SQL
CREATE TABLE Tags
(
    `id`        INT             NOT NULL    AUTO_INCREMENT COMMENT '테그아이디', 
    `teamId`    INT             NOT NULL    COMMENT '팀아이디', 
    `name`      VARCHAR(100)    NOT NULL    COMMENT '테그이름', 
    `createAt`  DATETIME        NOT NULL    COMMENT '테그생성일자', 
    `updateAt`  DATETIME        NOT NULL    COMMENT '테그수정일자', 
    `deleteAt`  DATETIME        NULL        COMMENT '테그삭제일자', 
    CONSTRAINT PK_Tags PRIMARY KEY (id)
);

ALTER TABLE Tags
    ADD CONSTRAINT FK_Tags_teamId_Teams_id FOREIGN KEY (teamId)
        REFERENCES Teams (id) ON DELETE CASCADE ON UPDATE CASCADE;


-- Deadlines Table Create SQL
CREATE TABLE Deadlines
(
    `id`         INT         NOT NULL    AUTO_INCREMENT COMMENT '유통기한아이디', 
    `teamId`     INT         NOT NULL    COMMENT '팀아이디', 
    `tagId`      INT         NULL    COMMENT '테그아이디', 
    `itemId`     INT         NULL    COMMENT '아이템아이디', 
    `ExpiredAt`  DATETIME    NOT NULL    COMMENT '유통기한', 
    `createAt`   DATETIME    NOT NULL    COMMENT '생성일자', 
    `updateAt`   DATETIME    NOT NULL    COMMENT '수정일자', 
    `deleteAt`   DATETIME    NULL        COMMENT '삭제일자', 
    CONSTRAINT PK_Deadline PRIMARY KEY (id)
);

ALTER TABLE Deadlines
    ADD CONSTRAINT FK_Deadlines_teamId_Teams_id FOREIGN KEY (teamId)
        REFERENCES Teams (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Deadlines
    ADD CONSTRAINT FK_Deadlines_tagId_Tags_id FOREIGN KEY (tagId)
        REFERENCES Tags (id) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE Deadlines
    ADD CONSTRAINT FK_Deadlines_itemId_Items_id FOREIGN KEY (itemId)
        REFERENCES Items (id) ON DELETE SET NULL ON UPDATE CASCADE;


-- TeamMembers Table Create SQL
CREATE TABLE TeamMembers
(
    `id`           INT         NOT NULL    AUTO_INCREMENT COMMENT '팀에 소속된 유저', 
    `teamId`       INT         NOT NULL    COMMENT '팀아이디', 
    `userId`       INT         NOT NULL    COMMENT '유저아이디', 
    `state`        INT         NOT NULL    COMMENT '가입상태', 
    `reagisterAt`  DATETIME    NOT NULL    COMMENT '가입일자', 
    `leaveAt`      DATETIME    NULL        COMMENT '탈퇴일자', 
    CONSTRAINT PK_TeamMembers PRIMARY KEY (id)
);

ALTER TABLE TeamMembers
    ADD CONSTRAINT FK_TeamMembers_teamId_Teams_id FOREIGN KEY (teamId)
        REFERENCES Teams (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE TeamMembers
    ADD CONSTRAINT FK_TeamMembers_userId_Users_id FOREIGN KEY (userId)
        REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE;


