-- Deploy oblog:post_category to pg

BEGIN;


CREATE OR REPLACE VIEW "entry" AS
	SELECT de.id, de.title,de.date, de.fixed, de.context, c.captures,p.paragraphs, p2.paragraphs_imp,l.links,k.keywords,category.label as category,category.id as category_id
    FROM diary_entry de
    LEFT OUTER JOIN (SELECT paragraph.diary_entry_id,json_object_agg(paragraph.id,paragraph.content)as paragraphs
        FROM paragraph
        GROUP BY paragraph.diary_entry_id
       ) p ON p.diary_entry_id=de.id
    LEFT OUTER JOIN (SELECT paragraph.diary_entry_id,json_object_agg(paragraph.id,paragraph.important)as paragraphs_imp
        FROM paragraph
        GROUP BY paragraph.diary_entry_id
       ) p2 ON p2.diary_entry_id=de.id
    LEFT OUTER JOIN ( SELECT link.diary_entry_id,json_object_agg(link.id,link.address)as links
        FROM link
        GROUP BY link.diary_entry_id
       ) l ON l.diary_entry_id=de.id
    LEFT OUTER JOIN ( SELECT capture.diary_entry_id,json_object_agg(capture.id,capture.path)as captures
        FROM capture
        GROUP BY capture.diary_entry_id
       ) c ON c.diary_entry_id=de.id
    LEFT OUTER JOIN (SELECT dk.diary_entry_id,json_object_agg(keyword.id,keyword.label)as keywords
        FROM keyword
        JOIN diary_entry_has_keyword as dk ON dk.keyword_id=keyword.id
        GROUP by  dk.diary_entry_id
       ) k ON k.diary_entry_id=de.id
    LEFT OUTER JOIN category on de.category_id=category.id
    ORDER BY de.date DESC;

COMMIT;

