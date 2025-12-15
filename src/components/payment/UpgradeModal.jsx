import React, { useState } from 'react';
import { X, Crown, CheckCircle, Loader, Zap } from 'lucide-react';
import { ENDPOINTS } from '../../config';
import loadScript from '../../utils/loadScript';

const UpgradeModal = ({ user, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const handlePayment = async () => {
    setLoading(true);
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    try {
      // 1. Create Order
      const token = localStorage.getItem('token');
      const orderResponse = await fetch(ENDPOINTS.CREATE_ORDER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ subscriptionPlan: 'PREMIUM' })
      });

      if (!orderResponse.ok) throw new Error('Failed to create order');

      const orderData = await orderResponse.json();

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "ResuCraft",
        description: "Premium Membership Upgrade",
        image: "https://via.placeholder.com/150",
        order_id: orderData.orderId,
        handler: async function (response) {
          // 2. Verify Payment
          try {
            const verifyResponse = await fetch(ENDPOINTS.VERIFY_PAYMENT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              })
            });

            if (verifyResponse.ok) {
              onSuccess();
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error(error);
            alert('Error verifying payment.');
          }
        },
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          contact: user.phone || ""
        },
        theme: {
          color: "#2563eb"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error(error);
      alert('Something went wrong initiating the payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-blue-600 p-8 text-center text-white">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Crown className="w-8 h-8 text-yellow-300" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Upgrade to Premium</h2>
          <p className="text-blue-100">Unlock professional templates & features</p>
        </div>

        <div className="p-8">
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>Access to <strong>Professional Templates</strong></span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>Priority Customer Support</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>Remove Branding</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <span className="text-4xl font-bold text-gray-900">₹499</span>
            <span className="text-gray-500">/lifetime</span>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
            {loading ? 'Processing...' : 'Get Premium Now'}
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            Secure payment via Razorpay. 100% Money back guarantee.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
