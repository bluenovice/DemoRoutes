sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("Route.demoRoute.controller.FirstPage", {
		onInit: function () {
				
	
		},
		onCLick: function(oEvent){
			var oRouter = this.getOwnerComponent().getRouter();
			var v = oEvent.getSource().getBindingContext();
			oRouter.navTo("RouteSecondPage",{
				ProductId: v.getProperty("ProductID")
			});
		}
		
	});
});