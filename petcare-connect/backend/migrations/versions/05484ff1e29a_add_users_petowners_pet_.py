"""add users petowners pet serviceproviders and services table

Revision ID: 05484ff1e29a
Revises: 
Create Date: 2023-03-28 21:52:05.792223

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '05484ff1e29a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_type', sa.String(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('username', sa.Unicode(), nullable=False),
    sa.Column('salt', sa.Unicode(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('email_verified', sa.Boolean(), server_default='True', nullable=True),
    sa.Column('is_active', sa.Boolean(), server_default='True', nullable=False),
    sa.Column('is_superuser', sa.Boolean(), server_default='False', nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('email', name='unique_email'),
    sa.UniqueConstraint('username'),
    sa.UniqueConstraint('username', name='unique_username')
    )
    op.create_table('petowners',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('phone_number', sa.String(), nullable=False),
    sa.Column('address_street', sa.String(), nullable=False),
    sa.Column('address_city', sa.String(), nullable=False),
    sa.Column('address_state', sa.String(), nullable=False),
    sa.Column('address_postalcode', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('serviceproviders',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('phone_number', sa.String(), nullable=False),
    sa.Column('address_street', sa.String(), nullable=False),
    sa.Column('address_city', sa.String(), nullable=False),
    sa.Column('address_state', sa.String(), nullable=False),
    sa.Column('address_postalcode', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('pets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('breed', sa.String(), nullable=False),
    sa.Column('birthdate', sa.Date(), nullable=False),
    sa.Column('gender', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['petowners.user_id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('services',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('provider_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['provider_id'], ['serviceproviders.user_id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('services')
    op.drop_table('pets')
    op.drop_table('serviceproviders')
    op.drop_table('petowners')
    op.drop_table('users')
    # ### end Alembic commands ###