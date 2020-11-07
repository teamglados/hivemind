-- Create admin user
CREATE USER admin WITH ENCRYPTED PASSWORD 'admin';
ALTER ROLE admin VALID UNTIL 'infinity';
ALTER ROLE admin NOSUPERUSER;
ALTER ROLE admin NOCREATEDB;
-- \du

-- Grant permissions to admin
GRANT ALL ON SCHEMA public TO admin;
GRANT ALL PRIVILEGES ON DATABASE prod TO admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;
-- \du
