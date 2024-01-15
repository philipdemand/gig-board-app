class CreateApplications < ActiveRecord::Migration[6.1]
  def change
    create_table :applications do |t|
      t.references :musician, null: false, foreign_key: true
      t.references :gig, null: false, foreign_key: true
      t.text :message
      t.string :status
      t.timestamps
    end
  end
end
