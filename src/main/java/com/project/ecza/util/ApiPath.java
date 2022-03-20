package com.project.ecza.util;

public class ApiPath {
	private static final String BASE_PATH = "/api";
	private static final String USER_PATH = "/user";
	private static final String USERPATH = "/user";
	private static final String ADMIN_PATH = "/admin";
	private static final String COUNTRY_PATH = "/country";
	private static final String COMPANY_PATH = "/company";
	private static final String MYACCOUNT_PATH = "/my-account";

	public static final class AdminUserCtrl {
		public static final String CTRL = BASE_PATH + ADMIN_PATH + USER_PATH;
	}
	public static final class CountryCtrl {
		public static final String CTRL = BASE_PATH  + COUNTRY_PATH;
	}
	public static final class AdminCompanyCtrl {
		public static final String CTRL = BASE_PATH  + COMPANY_PATH;
	}
	public static final class MyAccountCtrl {
		public static final String CTRL = BASE_PATH + MYACCOUNT_PATH;
	}
	public static final class UserCtrl {
		public static final String CTRL = BASE_PATH + USERPATH;
	}
}
