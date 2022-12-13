//
//  mobileApp.swift
//  mobile
//
//  Created by Иван Тазенков on 13.12.2022.
//

import SwiftUI

@main
struct mobileApp: App {
    var body: some Scene {
        WindowGroup {
            ListView(viewModel: ListViewModel())
        }
    }
}
