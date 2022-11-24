BEGIN;
DROP FUNCTION IF EXISTS update_entry;

CREATE FUNCTION update_entry(int, json) RETURNS diary_entry AS $$

    UPDATE diary_entry SET
        
        title = COALESCE($2->>'title', title),
        date = COALESCE(($2->>'date')::date, date),
        context = COALESCE($2->>'context', context),
        fixed = COALESCE(($2->>'fixed')::boolean, fixed),
        category_id = COALESCE(($2->>'category_id')::int, category_id)
    WHERE id = $1
    RETURNING *

$$ LANGUAGE sql STRICT;
COMMIT;