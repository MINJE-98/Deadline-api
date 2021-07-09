-- users Table Create SQL
CREATE TABLE Users
(
    `id`        INT           NOT NULL   AUTO_INCREMENT COMMENT 'ID', 
    `socialId`        VARCHAR(255)     NOT NULL    COMMENT '소셜 id', 
    `email`        VARCHAR(255)     NULL    COMMENT '유저이메일',
    `name`        VARCHAR(255)     NOT NULL    COMMENT '유저이름',  
    `profileURL`  VARCHAR(255)    NULL        COMMENT '유저 프로필 사진',
    `createAt` DATETIME    NOT NULL    COMMENT '생성일자',
    `updateAt` DATETIME    NOT NULL    COMMENT '수정일자',
    `deleteAt` DATETIME    NULL    COMMENT '삭제일자',
    PRIMARY KEY (id)
);

ALTER TABLE Users COMMENT '유저';


-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- teams Table Create SQL
CREATE TABLE Teams
(
    `id`        INT           NOT NULL   AUTO_INCREMENT COMMENT  '팀ID', 
    `name`        VARCHAR(20)      NOT NULL    COMMENT '팀이름', 
    `createAt` DATETIME    NOT NULL    COMMENT '생성일자',
    `updateAt` DATETIME    NOT NULL    COMMENT '수정일자',
    `deleteAt` DATETIME    NULL    COMMENT '삭제일자',
    PRIMARY KEY (id)
);

ALTER TABLE Teams COMMENT '팀';

-- 팀UID는 오직 하나의 값만 존재할 수 있다.

-- itmes Table Create SQL
-- CREATE TABLE itmes
-- (
--     `barcode`  VARCHAR(30)         NOT NULL  UNIQUE  COMMENT '바코드(FK)', 
--     `name`     VARCHAR(100)    NOT NULL    COMMENT '상품명', 
--     PRIMARY KEY (barcode)
-- );

-- ALTER TABLE itmes COMMENT '아이템';

-- -- 아이템의 바코드는 상품당 1개만 존재할 수 있다.

-- itemimages Table Create SQL
CREATE TABLE Items
(
    `id`   INT  NOT NULL   AUTO_INCREMENT COMMENT '아이템 아이디', 
    `teamid`  INT    NULL  COMMENT '팀UID(FK)', 
    `barcode`   VARCHAR(255)      NOT NULL   COMMENT '바코드', 
    `name`   VARCHAR(100)      NOT NULL   COMMENT '상품 명',
    `imageURL`  VARCHAR(255)    DEFAULT NULL    COMMENT '이미지URL', 
    `createAt` DATETIME    NOT NULL    COMMENT '생성일자',
    `updateAt` DATETIME    NOT NULL    COMMENT '수정일자',
    `deleteAt` DATETIME    NULL    COMMENT '삭제일자',
    PRIMARY KEY (id)
);

ALTER TABLE Items COMMENT '아이템이미지';


ALTER TABLE Items
    ADD CONSTRAINT FK_Items_teamid_Teams_teamid FOREIGN KEY (teamid)
        REFERENCES Teams (id) ON DELETE SET NULL ON UPDATE CASCADE
-- 참조 테이블 [teams]
-- [teams]이 삭제되었을 경우 => 기본값으로 귀속됩니다.(NULL)
-- [teams]이 업데이트될 경우 => 부모와 같이 업데이트 됩니다.

-- tags Table Create SQL
CREATE TABLE Tags
(
    `id`  INT             NOT NULL   AUTO_INCREMENT COMMENT '태그아이디', 
    `teamid`   INT     NOT NULL    COMMENT '팀UID(FK)', 
    `name`   VARCHAR(100)    NOT NULL    COMMENT '태그이름',
    `createAt` DATETIME    NOT NULL    COMMENT '생성일자',
    `updateAt` DATETIME    NOT NULL    COMMENT '수정일자',
    `deleteAt` DATETIME    NULL    COMMENT '삭제일자',
    PRIMARY KEY (id)
);

ALTER TABLE Tags COMMENT '태그';
/* 
* 태그는 팀이 존재하지 않으면 존재 할 수 없다.
*/
ALTER TABLE Tags
    ADD CONSTRAINT FK_Tags_teamid_teams_Teamid FOREIGN KEY (teamid)
        REFERENCES Teams (id) ON DELETE CASCADE ON UPDATE CASCADE;
-- 참조 테이블 [teams]
-- [teams]이 삭제 되었을 경우 => 부모와 같이 업데이트 됩니다.
-- [teams]이 업데이트 되었을 경우 => 부모와 같이 업데이트 됩니다.

-- deadline Table Create SQL
CREATE TABLE Deadline
(
    `id`        INT      NOT NULL   AUTO_INCREMENT COMMENT '유통기한아이디', 
    `teamid` INT    NOT NULL    COMMENT '팀UID(FK)', 
    `itemid`   INT    NULL COMMENT '아이템 아이디(FK)', 
    `tagid`     INT   NULL COMMENT '태그 아이디(FK)', 
    `expiredAt`  DATETIME      NOT NULL    COMMENT '유통기한', 
    `createAt` DATETIME    NOT NULL    COMMENT '생성일자',
    `updateAt` DATETIME    NOT NULL    COMMENT '수정일자',
    `deleteAt` DATETIME    NULL    COMMENT '삭제일자',
    PRIMARY KEY (id)
);

ALTER TABLE Deadline COMMENT '유통기한';

/* 
* 유통기한은 태그와, 이미지를 등록을 해도되고 안해도되지만.
* 팀이없다면 존재할 수 없다.
*/

ALTER TABLE Deadline
    ADD CONSTRAINT FK_Deadline_teamid_Teams_teamid FOREIGN KEY (teamid)
        REFERENCES Teams (id) ON DELETE CASCADE ON UPDATE CASCADE;
-- 참조 테이블 [teams]
-- [teams]가 삭제 되었을 경우 => 부모와 같이 업데이트 됩니다.
-- [teams]가 업데이트 되었을 경우 => 부모와 같이 업데이트 됩니다.

ALTER TABLE Deadline
    ADD CONSTRAINT FK_Deadline_itemid_Items_itemid FOREIGN KEY (itemid)
        REFERENCES Items (id) ON DELETE SET NULL ON UPDATE CASCADE;
-- 참조 테이블 [itemimages]
-- [itemimages]가 삭제 되었을 경우 => 기본값으로 귀속됩니다. (NULL)
-- [itemimages]가 업데이트 되었을 경우 => 부모와 같이 업데이트 됩니다.

ALTER TABLE Deadline
    ADD CONSTRAINT FK_Deadline_tagid_Tags_tagid FOREIGN KEY (tagid)
        REFERENCES Tags (id) ON DELETE SET NULL ON UPDATE CASCADE;
-- 참조 테이블 [tags]
-- [tags]가 삭제 되었을 경우 => 기본값으로 귀속됩니다. (NULL)
-- [tags]가 업데이트 되었을 경우 => 부모와 같이 업데이트 됩니다.






-- teamembers Table Create SQL
CREATE TABLE Teamembers
(
    `id`     INT             NOT NULL   AUTO_INCREMENT COMMENT '아이디', 
    `userid`   INT    NOT NULL    COMMENT '유저UID(FK)', 
    `teamid`   INT      NOT NULL    COMMENT '팀UID(FK)', 
    `state`  INT             NOT NULL    COMMENT '유저상태', 
    `createAt` DATETIME    NOT NULL    COMMENT '생성일자',
    `updateAt` DATETIME    NOT NULL    COMMENT '수정일자',
    `deleteAt` DATETIME    NULL    COMMENT '삭제일자',
    PRIMARY KEY (id)
);

ALTER TABLE Teamembers COMMENT '팀맴버';

ALTER TABLE Teamembers
    ADD CONSTRAINT FK_Teamembers_userid_Users_userid FOREIGN KEY (userid)
        REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE;
-- 참조 테이블 [users]
-- [users]가 삭제 되었을 경우 => 부모와 같이 업데이트 됩니다.
-- [users]가 업데이트 되었을 경우 => 부모와 같이 업데이트 됩니다.

ALTER TABLE Teamembers
    ADD CONSTRAINT FK_Teamembers_teamid_Teams_teamid FOREIGN KEY (teamid)
        REFERENCES Teams (id) ON DELETE CASCADE ON UPDATE CASCADE;
-- 참조 테이블 [teams]
-- [teams]가 삭제 되었을 경우 => 부모와 같이 업데이트 됩니다.
-- [teams]가 업데이트 되었을 경우 => 부모와 같이 업데이트 됩니다.


