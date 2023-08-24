package com.project.commerce.error;

//@RestController
public class ErrorHandler /*implements ErrorController */{
//
//	@Autowired
//	private ErrorAttributes errorAttributes;
//
//	@RequestMapping("/error")
//	ApiError handleError(WebRequest webRequest) {
//
//		ErrorAttributeOptions options = ErrorAttributeOptions
//				.defaults()
//				.including(ErrorAttributeOptions.Include.MESSAGE,
//						ErrorAttributeOptions.Include.STACK_TRACE,
//						ErrorAttributeOptions.Include.EXCEPTION,
//						ErrorAttributeOptions.Include.BINDING_ERRORS);
//
//
//		Map<String, Object> attributes = this.errorAttributes.getErrorAttributes(webRequest, options);
//		String message	= (String) attributes.get("message");
//		String path 	= (String) attributes.get("path");
//		int status		= (Integer) attributes.get("status");
//		ApiError error = new ApiError(status, message, path);
//		if(attributes.containsKey("errors")) {
//			@SuppressWarnings("unchecked")
//			List<FieldError> fieldErrors = (List<FieldError>)attributes.get("errors");
//			Map<String, String> validationErrors = new HashMap<>();
//			for(FieldError fieldError: fieldErrors) {
//				validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
//			}
//			error.setValidationErrors(validationErrors);
//		}
//		return error;
//	}


}
