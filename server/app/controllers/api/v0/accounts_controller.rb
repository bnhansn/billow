class Api::V0::AccountsController < Api::V0::BaseController
  def index
    render json: @user.accounts
  end

  def create
    account = Savers::Account.create(@user.id, params)
    if account.persisted?
      render json: account, status: :created
    else
      render_errors(account)
    end
  end

  def show
    account = @user.accounts.find(params[:id])
    render json: account
  end

  def update
    account = @user.accounts.find(params[:id])
    account = Savers::Account.update(account, params)

    if account.errors.empty?
      render json: account, status: :ok
    else
      render_errors(account)
    end
  end
end