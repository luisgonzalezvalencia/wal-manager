-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

DROP FUNCTION IF EXISTS public.get_transactions("accId" uuid, "startDate" timestamp without time zone, "endDate" timestamp without time zone);

CREATE OR REPLACE FUNCTION public.get_transactions(IN "accId" uuid,IN "startDate" timestamp without time zone,IN "endDate" timestamp without time zone)
    RETURNS TABLE(account character varying, amount numeric, "creditCardId" uuid, "creditCard" character varying, "creditCardType" "creditCardType", date timestamp without time zone, description character varying, "feeNumber" smallint, id uuid, "isPaid" boolean, "rootCategoryId" uuid, "rootCategory" character varying, "rootCategoryColor" character varying, "rootCategoryIcon" character varying, "subCategoryId" uuid, "subCategory" character varying, type "transactionType")
    LANGUAGE 'sql'
    VOLATILE
    PARALLEL UNSAFE
    COST 100    ROWS 1000

AS $BODY$

  select
    null as account,
    amount,
    null as "creditCardId",
    null as "creditCard",
    null as "creditCardType",
    date,
    null as description,
    null as "feeNumber",
    null as id,
    null as "isPaid",
    null as "rootCategoryId",
    null as "rootCategory",
    null as "rootCategoryColor",
    null as "rootCategoryIcon",
    null as "subCategoryId",
    null as "subCategory",
    null as type
  from public.get_balance("startDate" - interval '1 seconds')
  where amount > 0

  union all

  select
    a.name as account,
    case
      -- when t.is_paid = false then 0
      when t.type = 'expenses' then t.amount * (-1)
      when t.type = 'incomes' then t.amount
      else 0
    end as amount,
    cc.id as "creditCardId",
    cc.name as "creditCard",
    cc.type as "creditCardType",
    COALESCE(t."billedDate", o.date, t.date) as date,
    t.description,
    t."feeNumber",
    t.id,
    t."isPaid",
    COALESCE("parentCat".id, cat.id) as "rootCategoryId",
    COALESCE("parentCat".name, cat.name) as "rootCategory",
    COALESCE("parentCat".color, cat.color) as "rootCategoryColor",
    COALESCE("parentCat".icon, cat.icon) as "rootCategoryIcon",
    case when "parentCat".id is null then null else cat.id end as "subCategoryId",
    case when "parentCat".id is null then null else cat.name end as "subCategory",
    t.type
  from transaction as t
    inner join account as a
      on t."accountId" = a.id
    left join "creditCard" as cc
      on t."creditCardId" = cc.id

    inner join category as cat
      on t."categoryId" = cat.id
    left join category as "parentCat"
      on cat."parentId" = "parentCat".id

    left join public.get_ocurrences(t.id) as o
      on o.id = t.id and o.date >= "startDate" and o.date <= "endDate"

  where
        COALESCE(o.date, t.date) >= "startDate"
    and COALESCE(o.date, t.date) <= "endDate"
    and t."accountId" = "accId"

  order by date asc

$BODY$;
