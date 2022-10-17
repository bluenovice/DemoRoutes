sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller,oHistory) {
	"use strict";

	return Controller.extend("Route.demoRoute.controller.SecondView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Route.demoRoute.view.SecondView
		 */
		onInit: function () {
		var oRouter = this.getOwnerComponent().getRouter();
		oRouter.getRoute("RouteSecondPage").attachMatched(this._onObjectMatched, this);
		},
		onPress:function(oEvent){
			var shistory = oHistory.getInstance().getPreviousHash();
			if(shistory){
				window.history.go(-1);
			}
			else{
					var oRouter = this.getOwnerComponent().getRouter();
					oRouter.navTo('RouteFirstPage');
			}
		},
		_onObjectMatched:function(oEvent){
			this.getView().bindElement({ 
				path: "/Products(" + oEvent.getParameter("arguments").ProductId + ")"
			
			});
		},
		onDetailPage:function(oEvent){
			var oRouter = this.getOwnerComponent().getRouter();
			var v = oEvent.getSource().getBindingContext();
			oRouter.navTo("DetailPage",{
				ProductId: v.getProperty("ProductID")
			});
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf Route.demoRoute.view.SecondView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf Route.demoRoute.view.SecondView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf Route.demoRoute.view.SecondView
		 */
		//	onExit: function() {
		//
		//	}

	});

});