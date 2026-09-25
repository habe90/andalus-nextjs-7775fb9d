CREATE INDEX IF NOT EXISTS orders_created_idx ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS orders_email_idx ON orders(email);
CREATE INDEX IF NOT EXISTS sessions_expiry_idx ON admin_sessions(expires_at);
CREATE INDEX IF NOT EXISTS sessions_owner_idx ON admin_sessions(admin_id);
CREATE INDEX IF NOT EXISTS rate_expiry_idx ON rate_limits(expires);
CREATE INDEX IF NOT EXISTS catalog_sort_idx ON catalog_products(enabled,sort_order);
