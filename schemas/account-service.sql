CREATE DATABASE `demo_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE demo_db;

DROP TABLE IF EXISTS fc_account_carrier_extras;
DROP TABLE IF EXISTS fc_account_carrier;
DROP TABLE IF EXISTS fc_account;

CREATE TABLE IF NOT EXISTS fc_account
(
    _rid        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    account_uid CHAR(32)        NOT NULL COLLATE ascii_bin COMMENT '账号 UUID，具备唯一性',
    password    VARCHAR(64)     NOT NULL COLLATE ascii_bin DEFAULT '' COMMENT 'bcrypt.hash(password, salt)',
    is_enabled  TINYINT         NOT NULL                   DEFAULT 1 COMMENT '是否可用',
    nick_name   VARCHAR(64)     NOT NULL                   DEFAULT '' COMMENT '昵称',
    register_ip VARCHAR(64)     NOT NULL                   DEFAULT '' COMMENT '注册 IP 地址',
    create_time TIMESTAMP       NOT NULL                   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time TIMESTAMP       NOT NULL                   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE (account_uid)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS fc_account_carrier
(
    _rid         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    carrier_uid  VARCHAR(64)     NOT NULL COMMENT '载体 ID',
    carrier_type VARCHAR(16)     NOT NULL COLLATE ascii_bin COMMENT '账号载体（登录方式）',
    account_uid  CHAR(32)        NOT NULL COLLATE ascii_bin COMMENT '账号 UUID，-> fc_account.account_uid',
    FOREIGN KEY (account_uid) REFERENCES fc_account (account_uid)
        ON DELETE RESTRICT,
    create_time  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE (carrier_uid, carrier_type),
    UNIQUE (carrier_type, account_uid),
    INDEX (carrier_type)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS fc_account_carrier_extras
(
    _rid         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    carrier_uid  VARCHAR(64)     NOT NULL COMMENT '载体 ID',
    carrier_type VARCHAR(16)     NOT NULL COLLATE ascii_bin COMMENT '账号载体（登录方式）',
    extras_info  MEDIUMTEXT COMMENT '附加信息',
    create_time  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE (carrier_uid, carrier_type)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE utf8mb4_general_ci;
