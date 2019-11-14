require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context 'can save' do

      it 'content only' do
        expect(build(:message, image: nil)).to be_valid
      end

      it 'image only' do
        expect(build(:message, content: nil)).to be_valid
      end

      it 'content and image' do
        expect(build(:message)).to be_valid
      end
    end

    context 'can not save' do
      it 'not content and image' do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include('を入力してください')
      end

      it 'not group_id' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end

      it 'not user_id' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    end

  end
end