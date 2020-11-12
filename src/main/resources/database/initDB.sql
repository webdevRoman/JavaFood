-- Create database owner
CREATE ROLE java_food_admin WITH
    LOGIN
    SUPERUSER
    NOCREATEDB
    NOCREATEROLE
    INHERIT
    NOREPLICATION
    CONNECTION LIMIT -1;


--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

-- Started on 2020-11-02 19:24:27

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16858)
-- Name: basket; Type: TABLE; Schema: public; Owner: java_food_admin
--

CREATE TABLE public.basket (
    id integer NOT NULL,
    user_id integer
);


ALTER TABLE public.basket OWNER TO java_food_admin;

--
-- TOC entry 219 (class 1259 OID 16884)
-- Name: basket_dish; Type: TABLE; Schema: public; Owner: java_food_admin
--

CREATE TABLE public.basket_dish (
    id integer NOT NULL,
    basket_id integer,
    dish_id integer,
    amount integer
);


ALTER TABLE public.basket_dish OWNER TO java_food_admin;

--
-- TOC entry 218 (class 1259 OID 16882)
-- Name: basket_dish_id_seq; Type: SEQUENCE; Schema: public; Owner: java_food_admin
--

CREATE SEQUENCE public.basket_dish_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.basket_dish_id_seq OWNER TO java_food_admin;

--
-- TOC entry 2905 (class 0 OID 0)
-- Dependencies: 218
-- Name: basket_dish_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: java_food_admin
--

ALTER SEQUENCE public.basket_dish_id_seq OWNED BY public.basket_dish.id;


--
-- TOC entry 214 (class 1259 OID 16856)
-- Name: basket_id_seq; Type: SEQUENCE; Schema: public; Owner: java_food_admin
--

CREATE SEQUENCE public.basket_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.basket_id_seq OWNER TO java_food_admin;

--
-- TOC entry 2906 (class 0 OID 0)
-- Dependencies: 214
-- Name: basket_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: java_food_admin
--

ALTER SEQUENCE public.basket_id_seq OWNED BY public.basket.id;


--
-- TOC entry 207 (class 1259 OID 16805)
-- Name: company_info; Type: TABLE; Schema: public; Owner: java_food_admin
--

CREATE TABLE public.company_info (
    id integer NOT NULL,
    description character varying(3000),
    phone character varying(20),
    email character varying(100),
    address character varying(200)
);


ALTER TABLE public.company_info OWNER TO java_food_admin;

--
-- TOC entry 206 (class 1259 OID 16803)
-- Name: company_info_id_seq; Type: SEQUENCE; Schema: public; Owner: java_food_admin
--

CREATE SEQUENCE public.company_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.company_info_id_seq OWNER TO java_food_admin;

--
-- TOC entry 2907 (class 0 OID 0)
-- Dependencies: 206
-- Name: company_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: java_food_admin
--

ALTER SEQUENCE public.company_info_id_seq OWNED BY public.company_info.id;


--
-- TOC entry 211 (class 1259 OID 16824)
-- Name: dish; Type: TABLE; Schema: public; Owner: java_food_admin
--

CREATE TABLE public.dish (
    id integer NOT NULL,
    name character varying(100),
    weight integer,
    description character varying(300),
    image_address character varying(200),
    dish_type_id integer,
    price numeric
);


ALTER TABLE public.dish OWNER TO java_food_admin;

--
-- TOC entry 210 (class 1259 OID 16822)
-- Name: dish_id_seq; Type: SEQUENCE; Schema: public; Owner: java_food_admin
--

CREATE SEQUENCE public.dish_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dish_id_seq OWNER TO java_food_admin;

--
-- TOC entry 2908 (class 0 OID 0)
-- Dependencies: 210
-- Name: dish_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: java_food_admin
--

ALTER SEQUENCE public.dish_id_seq OWNED BY public.dish.id;


--
-- TOC entry 209 (class 1259 OID 16816)
-- Name: dish_type; Type: TABLE; Schema: public; Owner: java_food_admin
--

CREATE TABLE public.dish_type (
    id integer NOT NULL,
    name character varying(50)
);


ALTER TABLE public.dish_type OWNER TO java_food_admin;

--
-- TOC entry 208 (class 1259 OID 16814)
-- Name: dish_type_id_seq; Type: SEQUENCE; Schema: public; Owner: java_food_admin
--

CREATE SEQUENCE public.dish_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dish_type_id_seq OWNER TO java_food_admin;

--
-- TOC entry 2909 (class 0 OID 0)
-- Dependencies: 208
-- Name: dish_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: java_food_admin
--

ALTER SEQUENCE public.dish_type_id_seq OWNED BY public.dish_type.id;


--
-- TOC entry 213 (class 1259 OID 16840)
-- Name: favourite; Type: TABLE; Schema: public; Owner: java_food_admin
--

CREATE TABLE public.favourite (
    id integer NOT NULL,
    user_id integer,
    dish_id integer
);


ALTER TABLE public.favourite OWNER TO java_food_admin;

--
-- TOC entry 212 (class 1259 OID 16838)
-- Name: favourite_id_seq; Type: SEQUENCE; Schema: public; Owner: java_food_admin
--

CREATE SEQUENCE public.favourite_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favourite_id_seq OWNER TO java_food_admin;

--
-- TOC entry 2910 (class 0 OID 0)
-- Dependencies: 212
-- Name: favourite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: java_food_admin
--

ALTER SEQUENCE public.favourite_id_seq OWNED BY public.favourite.id;


--
-- TOC entry 217 (class 1259 OID 16871)
-- Name: order; Type: TABLE; Schema: public; Owner: java_food_admin
--

CREATE TABLE public.order (
    id integer NOT NULL,
    basket_id integer,
    address character varying(100),
    delivery_time timestamp without time zone
);


ALTER TABLE public.order OWNER TO java_food_admin;

--
-- TOC entry 216 (class 1259 OID 16869)
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: java_food_admin
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_id_seq OWNER TO java_food_admin;

--
-- TOC entry 2911 (class 0 OID 0)
-- Dependencies: 216
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: java_food_admin
--

ALTER SEQUENCE public.order_id_seq OWNED BY public.order.id;


--
-- TOC entry 203 (class 1259 OID 16778)
-- Name: role; Type: TABLE; Schema: public; Owner: java_food_admin
--

CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying(20) NOT NULL
);


ALTER TABLE public.role OWNER TO java_food_admin;

--
-- TOC entry 202 (class 1259 OID 16776)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: java_food_admin
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO java_food_admin;

--
-- TOC entry 2912 (class 0 OID 0)
-- Dependencies: 202
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: java_food_admin
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.role.id;


--
-- TOC entry 205 (class 1259 OID 16786)
-- Name: user; Type: TABLE; Schema: public; Owner: java_food_admin
--

CREATE TABLE public.user (
    id integer NOT NULL,
    login character varying(50),
    password character varying(100),
    role_id integer,
    first_name character varying(50),
    last_name character varying(50),
    mid_name character varying(50),
    phone character varying(20)
);


ALTER TABLE public.user OWNER TO java_food_admin;

--
-- TOC entry 204 (class 1259 OID 16784)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: java_food_admin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO java_food_admin;

--
-- TOC entry 2913 (class 0 OID 0)
-- Dependencies: 204
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: java_food_admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.user.id;


--
-- TOC entry 2743 (class 2604 OID 16861)
-- Name: basket id; Type: DEFAULT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.basket ALTER COLUMN id SET DEFAULT nextval('public.basket_id_seq'::regclass);


--
-- TOC entry 2745 (class 2604 OID 16887)
-- Name: basket_dish id; Type: DEFAULT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.basket_dish ALTER COLUMN id SET DEFAULT nextval('public.basket_dish_id_seq'::regclass);


--
-- TOC entry 2739 (class 2604 OID 16808)
-- Name: company_info id; Type: DEFAULT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.company_info ALTER COLUMN id SET DEFAULT nextval('public.company_info_id_seq'::regclass);


--
-- TOC entry 2741 (class 2604 OID 16827)
-- Name: dish id; Type: DEFAULT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.dish ALTER COLUMN id SET DEFAULT nextval('public.dish_id_seq'::regclass);


--
-- TOC entry 2740 (class 2604 OID 16819)
-- Name: dish_type id; Type: DEFAULT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.dish_type ALTER COLUMN id SET DEFAULT nextval('public.dish_type_id_seq'::regclass);


--
-- TOC entry 2742 (class 2604 OID 16843)
-- Name: favourite id; Type: DEFAULT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.favourite ALTER COLUMN id SET DEFAULT nextval('public.favourite_id_seq'::regclass);


--
-- TOC entry 2744 (class 2604 OID 16874)
-- Name: order id; Type: DEFAULT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.order ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- TOC entry 2737 (class 2604 OID 16781)
-- Name: role id; Type: DEFAULT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 2738 (class 2604 OID 16789)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.user ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2765 (class 2606 OID 16889)
-- Name: basket_dish basket_dish_pkey; Type: CONSTRAINT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.basket_dish
    ADD CONSTRAINT basket_dish_pkey PRIMARY KEY (id);


--
-- TOC entry 2761 (class 2606 OID 16863)
-- Name: basket basket_pkey; Type: CONSTRAINT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.basket
    ADD CONSTRAINT basket_pkey PRIMARY KEY (id);


--
-- TOC entry 2753 (class 2606 OID 16813)
-- Name: company_info company_info_pkey; Type: CONSTRAINT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.company_info
    ADD CONSTRAINT company_info_pkey PRIMARY KEY (id);


--
-- TOC entry 2757 (class 2606 OID 16832)
-- Name: dish dish_pkey; Type: CONSTRAINT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.dish
    ADD CONSTRAINT dish_pkey PRIMARY KEY (id);


--
-- TOC entry 2755 (class 2606 OID 16821)
-- Name: dish_type dish_type_pkey; Type: CONSTRAINT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.dish_type
    ADD CONSTRAINT dish_type_pkey PRIMARY KEY (id);


--
-- TOC entry 2759 (class 2606 OID 16845)
-- Name: favourite favourite_pkey; Type: CONSTRAINT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.favourite
    ADD CONSTRAINT favourite_pkey PRIMARY KEY (id);


--
-- TOC entry 2763 (class 2606 OID 16876)
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.order
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- TOC entry 2747 (class 2606 OID 16783)
-- Name: role roles_pkey; Type: CONSTRAINT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 2749 (class 2606 OID 16793)
-- Name: user users_login_key; Type: CONSTRAINT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.user
    ADD CONSTRAINT users_login_key UNIQUE (login);


--
-- TOC entry 2751 (class 2606 OID 16791)
-- Name: user users_pkey; Type: CONSTRAINT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.user
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2772 (class 2606 OID 16890)
-- Name: basket_dish basket_dish_basket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.basket_dish
    ADD CONSTRAINT basket_dish_basket_id_fkey FOREIGN KEY (basket_id) REFERENCES public.basket(id) NOT VALID;


--
-- TOC entry 2773 (class 2606 OID 16895)
-- Name: basket_dish basket_dish_dish_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.basket_dish
    ADD CONSTRAINT basket_dish_dish_id_fkey FOREIGN KEY (dish_id) REFERENCES public.dish(id) NOT VALID;


--
-- TOC entry 2770 (class 2606 OID 16864)
-- Name: basket basket_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.basket
    ADD CONSTRAINT basket_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user(id) NOT VALID;


--
-- TOC entry 2767 (class 2606 OID 16833)
-- Name: dish dish_dish_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.dish
    ADD CONSTRAINT dish_dish_type_id_fkey FOREIGN KEY (dish_type_id) REFERENCES public.dish_type(id) NOT VALID;


--
-- TOC entry 2769 (class 2606 OID 16851)
-- Name: favourite favourite_dish_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.favourite
    ADD CONSTRAINT favourite_dish_id_fkey FOREIGN KEY (dish_id) REFERENCES public.dish(id) NOT VALID;


--
-- TOC entry 2768 (class 2606 OID 16846)
-- Name: favourite favourite_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.favourite
    ADD CONSTRAINT favourite_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user(id) NOT VALID;


--
-- TOC entry 2771 (class 2606 OID 16877)
-- Name: order order_basket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.order
    ADD CONSTRAINT order_basket_id_fkey FOREIGN KEY (basket_id) REFERENCES public.basket(id) NOT VALID;


--
-- TOC entry 2766 (class 2606 OID 16794)
-- Name: user users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: java_food_admin
--

ALTER TABLE ONLY public.user
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(id);


-- Completed on 2020-11-02 19:24:29

--
-- PostgreSQL database dump complete
--

