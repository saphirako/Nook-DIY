"""empty message

Revision ID: ae4739dc7e0f
Revises: 9f73fa802e8b
Create Date: 2020-07-29 00:19:55.792246

"""
import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = "ae4739dc7e0f"
down_revision = "9f73fa802e8b"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "recipe_material",
        sa.Column("recipe_id", sa.Integer(), nullable=False),
        sa.Column("material_id", sa.Integer(), nullable=False),
        sa.Column("quantity", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(["material_id"], ["material.id"],),
        sa.ForeignKeyConstraint(["recipe_id"], ["recipe.id"],),
        sa.PrimaryKeyConstraint("recipe_id", "material_id"),
    )
    op.drop_table("recipe-material")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "recipe-material",
        sa.Column("recipe_id", mysql.INTEGER(), autoincrement=False, nullable=True),
        sa.Column("material_id", mysql.INTEGER(), autoincrement=False, nullable=True),
        sa.Column("quantity", mysql.INTEGER(), autoincrement=False, nullable=True),
        sa.ForeignKeyConstraint(["material_id"], ["material.id"], name="recipe-material_ibfk_1"),
        sa.ForeignKeyConstraint(["recipe_id"], ["recipe.id"], name="recipe-material_ibfk_2"),
        mysql_collate="utf8mb4_0900_ai_ci",
        mysql_default_charset="utf8mb4",
        mysql_engine="InnoDB",
    )
    op.drop_table("recipe_material")
    # ### end Alembic commands ###
