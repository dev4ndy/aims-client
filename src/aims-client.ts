/**
 * Module to deal with available AIMS Public API endpoints
 */
import { ALClient } from '@al/client';

class AIMSClient {

  private alClient = ALClient;

  /**
   * Get Account Details
   * GET
   * /aims/v1/:account_id/account
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/account"
   */
  async getAccountDetails(accountId) {
    const accountDetails = await this.alClient.fetch({
      service_name: 'aims',
      account_id: accountId,
      path: '/account',
    });
    return accountDetails;
  }

  /**
   * List managed accounts
   * GET
   * /aims/v1/:account_id/accounts/:relationship
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/accounts/managed"
   */
  async getManagedAccounts(accountId, queryParams) {
    const managedAccounts = await this.alClient.fetch({
      service_name: 'aims',
      account_id: accountId,
      path: '/accounts/managed',
      params: queryParams,
    });
    return managedAccounts;
  }

  /**
   * List managed account IDs
   * GET
   * /aims/v1/:account_id/account_ids/:relationship
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/account_ids/managed"
   */
  async getManagedAccountIds(accountId, queryParams) {
    const managedAccountIds = await this.alClient.fetch({
      service_name: 'aims',
      account_id: accountId,
      path: '/account_ids/managed',
      params: queryParams,
    });
    return managedAccountIds;
  }

  /**
   * Update account MFA requirements
   * POST
   * /aims/v1/:account_id/account
   * -d '{"mfa_required": true}' "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/account"
   */
  async requireMFA(accountId, mfaRequired) {
    const mfa = await this.alClient.post({
      service_name: 'aims',
      account_id: accountId,
      path: '/account',
      data: `{mfa_required: ${mfaRequired}}`,
    });
    return mfa;
  }

  /**
   * Authenticate a user's identity
   * POST
   * /aims/v1/authenticate
   * -u username:password "https://api.cloudinsight.alertlogic.com/aims/v1/authenticate"
   */
  async authenticate(params, user, pass, mfa) {
    const access = await this.alClient.authenticate(params, user, pass, mfa);
    return access;
  }

  /**
   * Change a user's password
   * POST
   * /aims/v1/change_password
   * -d '{"email": "admin@company.com", "current_password": "hunter2", "new_password": "Fraudulent$Foes"}' "https://api.cloudinsight.alertlogic.com/aims/v1/change_password"
   */
  async changePassword(email, password, newPassword) {
    const changePass = await this.alClient.post({
      service_name: 'aims',
      path: '/change_password',
      data: `{email: ${email}, current_password: ${password}, new_password: ${newPassword}}`,
    });
    return changePass;
  }

  /**
   * Obtain Authentication Token Information (Account, User, Roles, etc.)
   * GET
   * /aims/v1/token_info
   * "https://api.cloudinsight.alertlogic.com/aims/v1/token_info"
   */
  async tokenInfo() {
    const tokenData = await this.alClient.fetch({
      service_name: 'aims',
      path: '/token_info',
    });
    return tokenData;
  }

  /**
   * Initiate the password reset process for a user
   * POST
   * /aims/v1/reset_password
   * -d '{"email": "admin@company.com", "return_to": "https://console.alertlogic.net"}' "https://api.cloudinsight.alertlogic.com/aims/v1/reset_password"
   */
  async initiateReset(email, returnTo) {
    const reset = await this.alClient.post({
      service_name: 'aims',
      path: '/reset_password',
      data: `{email: ${email}, return_to: ${returnTo}}`,
    });
    return reset;
  }

  /**
   * Reset a user's password using a token
   * PUT
   * /aims/v1/reset_password/:token
   * -d '{"password": "hunter2"}' "https://api.cloudinsight.alertlogic.com/aims/v1/reset_password/69EtspCz3c4"
   */
  async resetWithToken(token, password) {
    const reset = await this.alClient.set({
      service_name: 'aims',
      path: `/reset_password/${token}`,
      data: `{password: ${password}}`,
    });
    return reset;
  }

  /**
   * Create a role
   * POST
   * /aims/v1/:account_id/roles
   * -d '{"name": "Super Mega Power User", "permissions": {"*:own:*:*": "allowed", "aims:own:grant:*":"allowed"}}' "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles"
   */
  async createRole(accountId, name, permissions) {
    const roleCreate = await this.alClient.post({
      service_name: 'aims',
      account_id: accountId,
      path: '/roles', data: `{name: ${name}, permissions: ${permissions}}`,
    });
    return roleCreate;
  }

  /**
   * Delete a role
   * DELETE
   * /aims/v1/:account_id/roles/:role_id
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles/C7C5BE57-F199-4F14-BCB5-43E31CA02842"
   */
  async deleteRole(accountId, roleId) {
    const roleDelete = await this.alClient.delete({
      service_name: 'aims',
      account_id: accountId,
      path: `/roles/${roleId}`,
    });
    return roleDelete;
  }

  /**
   * Get global role, a role that is shared among accounts.
   * GET
   * /aims/v1/roles/:role_id
   * "https://api.cloudinsight.alertlogic.com/aims/v1/roles/2A33175D-86EF-44B5-AA39-C9549F6306DF"
   */
  async getGlobalRole(roleId) {
    const role = await this.alClient.fetch({
      service_name: 'aims',
      path: `/roles/${roleId}`,
    });
    return role;
  }

  /**
   * Get role
   * GET
   * /aims/v1/:account_id/roles/:role_id
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles/2A33175D-86EF-44B5-AA39-C9549F6306DF"
   */
  async getAccountRole(accountId, roleId) {
    const role = await this.alClient.fetch({
      service_name: 'aims',
      account_id: accountId,
      path: `/roles/${roleId}`,
    });
    return role;
  }

  /**
   * List global roles, roles that are shared among all accounts.
   * GET
   * /aims/v1/roles
   * "https://api.cloudinsight.alertlogic.com/aims/v1/roles"
   */
  async getGlobalRoles() {
    const roles = await this.alClient.fetch({
      service_name: 'aims',
      path: '/roles',
    });
    return roles;
  }

  /**
   * List roles for an account. Global roles are included in the list.
   * GET
   * /aims/v1/:account_id/roles
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles"
   */
  async getAccountRoles(accountId) {
    const roles = await this.alClient.fetch({
      service_name: 'aims',
      account_id: accountId,
      path: '/roles',
    });
    return roles;
  }

  /**
   * Update Role Name and Permissions
   * POST
   * /aims/v1/:account_id/roles/:role_id
   * -d '{"name": "Mega Power User", "permissions": {"*:own:*:*": "allowed", "aims:own:grant:*":"allowed"}}' "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles/2A33175D-86EF-44B5-AA39-C9549F6306DF"
   */
  async updateRole(accountId, name, permissions) {
    const roleUpdate = await this.alClient.post({
      service_name: 'aims',
      account_id: accountId,
      path: '/roles', data: `{name: ${name}, permissions: ${permissions}}`,
    });
    return roleUpdate;
  }
  /**
   * Update Role Name
   * POST
   * /aims/v1/:account_id/roles/:role_id
   * -d '{"name": "Mega Power User"}' "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles/2A33175D-86EF-44B5-AA39-C9549F6306DF"
   */
  async updateRoleName(accountId, name) {
    const updateRole = await this.alClient.post({
      service_name: 'aims',
      account_id: accountId,
      path: '/roles',
      data: `{name: ${name}}`,
    });
    return updateRole;
  }
  /**
   * Update Role Permissions
   * POST
   * /aims/v1/:account_id/roles/:role_id
   * -d '{"permissions": {"*:own:*:*": "allowed", "aims:own:grant:*":"allowed"}}' "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles/2A33175D-86EF-44B5-AA39-C9549F6306DF"
   */
  async updateRolePermissions(accountId, permissions) {
    const updateRole = await this.alClient.post({
      service_name: 'aims',
      account_id: accountId,
      path: '/roles',
      data: `{permissions: ${permissions}}`,
    });
    return updateRole;
  }

  /**
   * Enroll an MFA device for a user
   * POST
   * /aims/v1/user/mfa/enroll
   *  "https://api.cloudinsight.alertlogic.com/aims/v1/user/mfa/enroll" \
   * -H "Content-Type: application/json" \
   * -H "X-Aims-Session-Token: a3e12fwafge1g9" \
   * -d @- << EOF
   * {
   *    "mfa_uri": "otpauth://totp/Alert%20Logic:admin@company.com?secret=GFZSA5CINFJSA4ZTNNZDG5BAKM2EMMZ7&issuer=Alert%20Logic&algorithm=SHA1"
   *    "mfa_codes": ["123456", "456789"]
   * }
   * EOF
   */
  async enrollMFA(uri, codes) {
    const mfa = await this.alClient.post({
      service_name: 'aims',
      path: '/user/mfa/enroll',
      data: `{mfa_uri: ${uri}, mfa_codes: ${codes}}`,
    });
    return mfa;
  }

  /**
   * Remove a user's MFA device
   * DELETE
   * /aims/v1/user/mfa/:email
   * "https://api.cloudinsight.alertlogic.com/aims/v1/user/mfa/admin@company.com"
   */
  async deleteMFA(email) {
    const mfa = await this.alClient.delete({
      service_name: 'aims',
      path: `/user/mfa/${email}`,
    });
    return mfa;
  }
}

export const aimsClient =  new AIMSClient();
