class AccountSerializer < ActiveModel::Serializer
  def json_key
    'data'
  end

  attributes :id,
             :created_at,
             :description,
             :image,
             :key,
             :meta_title,
             :meta_description,
             :name,
             :owner_id,
             :slug,
             :updated_at
end
