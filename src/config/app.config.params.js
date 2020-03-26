module.exports = {
	LIST_SWAGGER_CONF_ENDPOINTS: {
		 "dev": [{
			'className': 'pmsAPI',
			'apiName': 'pms',
			// 'url': 'https://284d58e4.ngrok.io',
			//'url': 'http://tenant.internal-pms.stage-codal.net',
			'url':'https://4866197f.ngrok.io',
			'path': '../src/app/services/swagger-providers/pms-api.provider.ts',
			'sub_path': '/api/doc?format=openapi'
		}], "qa": [{
			'className': 'pmsAPI',
			'apiName': 'pms',
			'url': '',
			'path': '../src/app/services/swagger-providers/pms-api.provider.ts',
			'sub_path': '/api/doc?format=openapi'
		}], "production": [{
			'className': 'pmsAPI',
			'apiName': 'pms',
			'url': '',
			'path': '../src/app/services/swagger-providers/pms-api.provider.ts',
			'sub_path': '/api/doc?format=openapi'
		}],
	}
};
