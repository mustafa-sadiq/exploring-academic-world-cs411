CREATE TRIGGER before_insert_university
BEFORE INSERT ON university
FOR EACH ROW
BEGIN
  SET NEW.name = UPPER(NEW.name);
END;