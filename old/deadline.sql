-- users Table Create SQL
CREATE TABLE Users
(
    `uuid`        INT           NOT NULL   AUTO_INCREMENT COMMENT 'UUID', 
    `user_id`        VARCHAR(255)     NOT NULL    COMMENT '유저 id', 
    `email`        VARCHAR(255)     NOT NULL    COMMENT '유저이메일',
    `name`        VARCHAR(255)     NOT NULL    COMMENT '유저이름',  
    `profileURL`  VARCHAR(255)    NULL        COMMENT '유저 프로필 사진',
    `lastlogindate` DATETIME    NOT NULL    COMMENT '마지막 로그인날짜';
    `registerdate` DATETIME    NOT NULL    COMMENT '가입 날짜';
    PRIMARY KEY (uuid)
);

ALTER TABLE users COMMENT '유저';


-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- teams Table Create SQL
CREATE TABLE teams
(
    `tuid`        VARCHAR(6)       NOT NULL  UNIQUE  COMMENT '팀UID', 
    `name`        VARCHAR(20)      NOT NULL    COMMENT '팀이름', 
    `makedate`    DATETIME         NOT NULL    COMMENT '팀 생성일자', 
    PRIMARY KEY (tuid)
);

ALTER TABLE teams COMMENT '팀';

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
CREATE TABLE goods
(
    `goodsid`   INT              NOT NULL   AUTO_INCREMENT COMMENT '아이템 아이디', 
    `tuid`      VARCHAR(6)       DEFAULT NULL  COMMENT '팀UID(FK)', 
    `barcode`   VARCHAR(30)      NOT NULL   COMMENT '바코드', 
    `name`   VARCHAR(100)      NOT NULL   COMMENT '상품 명', 
    `imageURL`  VARCHAR(1000)    DEFAULT NULL    COMMENT '이미지URL', 
    `usecount`  INT              NOT NULL  DEFAULT 0  COMMENT '사용횟수', 
    PRIMARY KEY (goodsid)
);

ALTER TABLE goods COMMENT '아이템이미지';

/* 
* 바코드 없이 존재 할 수 없다.
* 팀없이 존재 할 수 있다.
*/

ALTER TABLE goods
    ADD CONSTRAINT FK_goods_tuid_teams_tuid FOREIGN KEY (tuid)
        REFERENCES teams (tuid) ON DELETE SET DEFAULT ON UPDATE CASCADE
-- 참조 테이블 [teams]
-- [teams]이 삭제되었을 경우 => 기본값으로 귀속됩니다.(NULL)
-- [teams]이 업데이트될 경우 => 부모와 같이 업데이트 됩니다.

-- tags Table Create SQL
CREATE TABLE tags
(
    `tagid`  INT             NOT NULL   AUTO_INCREMENT COMMENT '태그아이디', 
    `tuid`   VARCHAR(6)      NOT NULL    COMMENT '팀UID(FK)', 
    `name`   VARCHAR(100)    NOT NULL    COMMENT '태그이름', 
    PRIMARY KEY (tagid)
);

ALTER TABLE tags COMMENT '태그';
/* 
* 태그는 팀이 존재하지 않으면 존재 할 수 없다.
*/
ALTER TABLE tags
    ADD CONSTRAINT FK_tags_tuid_teams_tuid FOREIGN KEY (tuid)
        REFERENCES teams (tuid) ON DELETE CASCADE ON UPDATE CASCADE;
-- 참조 테이블 [teams]
-- [teams]이 삭제 되었을 경우 => 부모와 같이 업데이트 됩니다.
-- [teams]이 업데이트 되었을 경우 => 부모와 같이 업데이트 됩니다.

-- deadline Table Create SQL
CREATE TABLE deadline
(
    `id`        INT           NOT NULL   AUTO_INCREMENT COMMENT '유통기한아이디', 
    `tuid`      VARCHAR(6)    NOT NULL    COMMENT '팀UID(FK)', 
    `goodsid`   INT           DEFAULT NULL COMMENT '아이템 아이디(FK)', 
    `tagid`     INT           DEFAULT NULL COMMENT '태그 아이디(FK)', 
    `expdate`  DATETIME      NOT NULL    COMMENT '유통기한', 
    `uploaddate`    DATETIME      NOT NULL    COMMENT '업로드 일자', 
    PRIMARY KEY (id)
);

ALTER TABLE deadline COMMENT '유통기한';

/* 
* 유통기한은 태그와, 이미지를 등록을 해도되고 안해도되지만.
* 팀이없다면 존재할 수 없다.
*/

ALTER TABLE deadline
    ADD CONSTRAINT FK_deadline_tuid_teams_tuid FOREIGN KEY (tuid)
        REFERENCES teams (tuid) ON DELETE CASCADE ON UPDATE CASCADE;
-- 참조 테이블 [teams]
-- [teams]가 삭제 되었을 경우 => 부모와 같이 업데이트 됩니다.
-- [teams]가 업데이트 되었을 경우 => 부모와 같이 업데이트 됩니다.

ALTER TABLE deadline
    ADD CONSTRAINT FK_deadline_goodsid_goods_goodsid FOREIGN KEY (goodsid)
        REFERENCES goods (goodsid) ON DELETE SET NULL ON UPDATE CASCADE;
-- 참조 테이블 [itemimages]
-- [itemimages]가 삭제 되었을 경우 => 기본값으로 귀속됩니다. (NULL)
-- [itemimages]가 업데이트 되었을 경우 => 부모와 같이 업데이트 됩니다.

ALTER TABLE deadline
    ADD CONSTRAINT FK_deadline_tagid_tags_tagid FOREIGN KEY (tagid)
        REFERENCES tags (tagid) ON DELETE SET NULL ON UPDATE CASCADE;
-- 참조 테이블 [tags]
-- [tags]가 삭제 되었을 경우 => 기본값으로 귀속됩니다. (NULL)
-- [tags]가 업데이트 되었을 경우 => 부모와 같이 업데이트 됩니다.






-- teamembers Table Create SQL
CREATE TABLE teamembers
(
    `id`     INT             NOT NULL   AUTO_INCREMENT COMMENT '아이디', 
    `uuid`   VARCHAR(100)    NOT NULL    COMMENT '유저UID(FK)', 
    `tuid`   VARCHAR(6)      NOT NULL    COMMENT '팀UID(FK)', 
    `state`  INT             NOT NULL    COMMENT '유저상태', 
    PRIMARY KEY (id)
);

ALTER TABLE teamembers COMMENT '팀맴버';

ALTER TABLE teamembers
    ADD CONSTRAINT FK_teamembers_uuid_users_uuid FOREIGN KEY (uuid)
        REFERENCES users (uuid) ON DELETE CASCADE ON UPDATE CASCADE;
-- 참조 테이블 [users]
-- [users]가 삭제 되었을 경우 => 부모와 같이 업데이트 됩니다.
-- [users]가 업데이트 되었을 경우 => 부모와 같이 업데이트 됩니다.
ALTER TABLE teamembers
    ADD CONSTRAINT FK_teamembers_tuid_teams_tuid FOREIGN KEY (tuid)
        REFERENCES teams (tuid) ON DELETE CASCADE ON UPDATE CASCADE;
-- 참조 테이블 [teams]
-- [teams]가 삭제 되었을 경우 => 부모와 같이 업데이트 됩니다.
-- [teams]가 업데이트 되었을 경우 => 부모와 같이 업데이트 됩니다.


