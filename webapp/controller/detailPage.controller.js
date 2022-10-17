sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller,oHistory) {
	"use strict";

	return Controller.extend("Route.demoRoute.controller.detailPage", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Route.demoRoute.view.detailPage
		 */
		onInit: function () {
			this.key = ["ProductName","ProductId","Supplier","Discontinued"];
			var jModel = {
				"tab": this.key[2]         
			};
			this.getView().setModel(new sap.ui.model.json.JSONModel(jModel), "DetailSelection");
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("DetailPage").attachMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function (oEvent) {
			var oArgs = oEvent.getParameter("arguments");
			this.getView().bindElement({
				path: "/Products(" + oArgs.ProductId + ")/"
			});
			var oRouter = this.getOwnerComponent().getRouter();
		
			if (oArgs["?query"] !== undefined){
				if(oArgs["?query"].tab === "Supplier"){
					oRouter.getTargets().display("lazyload");
				}
				else{
				var oSelect = this.getView().getModel("DetailSelection");
				oSelect.setProperty("/tab",oArgs["?query"].tab);
				}
			}
			else{
				oRouter.navTo("DetailPage",{
				ProductId: oArgs.ProductId,
				query:{
					tab:this.key[0]
				}
				});
				
				}
			},
			
			Onselect: function(oEvent){
				var oRouter = this.getOwnerComponent().getRouter();
				var oArgs = oEvent.getSource().getBindingContext().getProperty("ProductID");
				if(oEvent.getSource().getSelectedKey() === "Supplier"){
					oRouter.navTo("DetailPage",{
					ProductId: oArgs,
					query:{
						tab:this.key[2]
					}
					});
				}
				else{
					oRouter.navTo("DetailPage",{
					ProductId: oArgs,
					query:{
						tab:oEvent.getSource().getSelectedKey()
					}
				});
				}
				
			},
			
			onBack : function(oEvent){
				var history = oHistory.getInstance().getPreviousHash();
				
				if(history === undefined){
					window.history.go(-1);
				}
				else{
					var oRouter = this.getOwnerComponent().getRouter();
					oRouter.navTo("RouteSecondPage",{
						ProductId : this.getView().getBindingContext().getProperty("ProductID")
					});	
				}				
				
			}
			
			
		

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf Route.demoRoute.view.detailPage
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf Route.demoRoute.view.detailPage
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf Route.demoRoute.view.detailPage
		 */
		//	onExit: function() {
		//
		//	}

	});

});