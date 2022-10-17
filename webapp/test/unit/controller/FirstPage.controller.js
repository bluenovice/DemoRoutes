/*global QUnit*/

sap.ui.define([
	"Route/demoRoute/controller/FirstPage.controller"
], function (Controller) {
	"use strict";

	QUnit.module("FirstPage Controller");

	QUnit.test("I should test the FirstPage controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});