class CreateGigs < ActiveRecord::Migration[6.1]
  def change
    create_table :gigs do |t|
      t.references :director, null: false, foreign_key: true
      t.string :title, null: false
      t.date :start_date
      t.date :end_date
      t.text :description
      t.timestamps
    end
  end
end
