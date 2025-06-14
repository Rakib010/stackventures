show timezone;

SELECT now();

CREATE Table time2 (
    ts TIMESTAMP WITHOUT TIME ZONE,
    tsz TIMESTAMP WITH TIME ZONE
);

insert into
    time2
values (
        '2024-01-13 10:45:00',
        '2024-01-13 10:45:00'
    )

SELECT * FROM time2;

SELECT CURRENT_DATE;

SELECT now()::date;

SELECT Now()::time;

SELECT to_char(now(),'ddd')

SELECT CURRENT_DATE - INTERVAL '1 year'

SELECT age(CURRENT_DATE, '1999-09-03');


SELECT extract(year FROM '1999-09-03'::date)