
SELECT * FROM student;

-- GROUP BY ব্যবহার করা হয় একই ধরনের ডেটা একসাথে গ্রুপ করতে।এটা সাধারণত Aggregate Function এর (যেমন COUNT, SUM, AVG) সঙ্গে ব্যবহৃত হয়
SELECT country, count(*),avg(age) FROM student 
  GROUP BY country;
  
-- WHERE ক্লজ ব্যবহার হয় row ফিল্টার করার জন্য, কিন্তু HAVING ব্যবহার হয় group ফিল্টার করার জন্য। HAVING সবসময় GROUP BY এর পরে ব্যবহার হয়।
-- filter group using having to show only countries with average age above 22
SELECT country,avg(age) FROM student 
  GROUP BY country HAVING avg(age) > 20;

-- count student born in each year 
SELECT extract (YEAR FROM dob) as birth_year ,count(*)
 FROM student GROUP BY birth_year


  

