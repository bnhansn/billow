require_relative '../../../../rails_helper'

RSpec.describe Api::V0::LoginController, type: :controller do
  describe 'POST #login' do
    it 'returns encoded token and user info with successful login' do
      user = create(:user)

      process :login,
              method: :post,
              params: { email: user.email, password: user.password }

      result = JSON.parse(response.body)

      expect(response).to have_http_status(:ok)
      expect(result['meta']['token']).not_to be(nil)
      expect(result['data']['id']).to eq(user.id)
      expect(result['data']['email']).to eq(user.email)
    end

    it 'returns unauthorized if password is incorrect' do
      user = create(:user, password: 'password')

      process :login,
              method: :post,
              params: { email: user.email, password: 'invalidpassword' }

      expect(response).to have_http_status(:unauthorized)
      expect(response.body).to have_error('Invalid email or password')
    end

    it 'returns unauthorized if no user is found by email' do
      user = create(:user, email: 'email@test.com')

      process :login,
              method: :post,
              params: { email: 'invalid@test.com', password: user.password }

      expect(response).to have_http_status(:unauthorized)
      expect(response.body).to have_error('Invalid email or password')
    end
  end
end
