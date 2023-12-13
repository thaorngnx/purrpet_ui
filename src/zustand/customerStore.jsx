import {
  getCustomerByCode,
  updateCustomer,
  createCustomer,
  getCustomerById,
} from "../api/customer";
import { verifyOtp } from "../api/otp";
import { logout } from "../api/auth";

const customerState = {
  loading: false,
  error: null,
  data: null,
};

export const customerStore = (set, get) => ({
  customerState,
  setCustomerState: (newState) => {
    set(
      (state) => {
        state.customerState = newState;
      },
      false,
      `customer/setCustomerState`,
    );
  },
  getCustomerById: (customerId) => {
    set(
      (state) => {
        state.customerState.loading = true;
      },
      false,
      `customer/getCustomerById_loading`,
    );
    getCustomerById(customerId).then((res) => {
      console.log(res);
      if (res.err === 0) {
        set(
          (state) => {
            state.customerState.loading = false;
            state.customerState.data = res.data;
            state.customerState.error = null;
          },
          false,
          `customer/getCustomerById_success`,
        );
      } else {
        set(
          (state) => {
            state.customerState.loading = false;
            state.customerState.error = res.message;
            state.customerState.data = null;
          },
          false,
          `customer/getCustomerById_error`,
        );
      }
    });
  },
  getCustomerByCode: (customerCode) => {
    set(
      (state) => {
        state.customerState.loading = true;
      },
      false,
      `customer/getCustomerByCode_loading`,
    );
    getCustomerByCode(customerCode).then((res) => {
      console.log(res);
      if (res.err === 0) {
        set(
          (state) => {
            state.customerState.loading = false;
            state.customerState.data = res.data;
            state.customerState.error = null;
          },
          false,
          `customer/getCustomerByCode_success`,
        );
      } else {
        set(
          (state) => {
            state.customerState.loading = false;
            state.customerState.error = res.message;
            state.customerState.data = null;
          },
          false,
          `customer/getCustomerByCode_error`,
        );
      }
    });
  },
  updateCustomer: (customerInfo) => {
    set(
      (state) => {
        state.customerState.loading = true;
      },
      false,
      `customer/updateCustomer_loading`,
    );
    updateCustomer(customerInfo).then((res) => {
      console.log(res);
      if (res.err === 0) {
        set(
          (state) => {
            state.customerState.loading = false;
            state.customerState.data = res.data;
            state.customerState.error = null;
          },
          false,
          `customer/updateCustomer_success`,
        );
      } else {
        set(
          (state) => {
            state.customerState.loading = false;
            state.customerState.error = res.message;
          },
          false,
          `customer/updateCustomer_error`,
        );
      }
    });
  },
  createCustomer: (customerInfo) => {
    set(
      (state) => {
        state.customerState.loading = true;
      },
      false,
      `customer/createCustomer_loading`,
    );
    createCustomer(customerInfo).then((res) => {
      console.log(res);
      if (res.err === 0) {
        set(
          (state) => {
            state.customerState.loading = false;
            state.customerState.data = res.data;
            state.customerState.error = null;
          },
          false,
          `customer/createCustomer_success`,
        );
      } else {
        set(
          (state) => {
            state.customerState.loading = false;
            state.customerState.error = res.message;
          },
          false,
          `customer/createCustomer_error`,
        );
      }
    });
  },
  verifyOtp: (otpInfo) => {
    set(
      (state) => {
        state.customerState.loading = true;
      },
      false,
      `customer/verifyOtp_loading`,
    );
    verifyOtp(otpInfo).then((res) => {
      console.log(res);
      if (res.err === 0) {
        set(
          (state) => {
            state.customerState.loading = false;
            state.customerState.data = res.data;
            state.customerState.error = null;
          },
          false,
          `customer/verifyOtp_success`,
        );
      } else {
        set(
          (state) => {
            state.customerState.loading = false;
            state.customerState.error = res.message;
            state.customerState.data = null;
          },
          false,
          `customer/verifyOtp_error`,
        );
      }
    });
  },
  logout: () => {
    set(
      (state) => {
        state.customerState.loading = true;
      },
      false,
      `customer/logout_loading`,
    );
    logout().then((res) => {
      console.log(res);
      if (res.err === 0) {
        set(
          (state) => {
            state.customerState.loading = false;
            state.customerState.data = null;
            state.customerState.error = null;
          },
          false,
          `customer/logout_success`,
        );
      } else {
        set(
          (state) => {
            state.customerState.loading = false;
            state.customerState.error = res.message;
          },
          false,
          `customer/logout_error`,
        );
      }
    });
  },
});
