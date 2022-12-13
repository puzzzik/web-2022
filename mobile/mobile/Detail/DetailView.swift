//
//  DetailView.swift
//  mobile
//
//  Created by Иван Тазенков on 13.12.2022.
//

import Foundation
import SwiftUI

struct DetailView: View {
    @ObservedObject var viewModel: DetailViewModel

    var body: some View {
        NavigationView {
            List {
                HStack{
                    Text("Имя")
                    Spacer()
                    Text(viewModel.product.name ?? "Пусто")
                }
                HStack {
                    Text("Бренд")
                    Spacer()
                    Text(viewModel.product.brand ?? "Пусто")
                }
                HStack {
                    Text("Тип")
                    Spacer()
                    Text(viewModel.product.type ?? "Пусто")
                }
                HStack {
                    Text("Крепость")
                    Spacer()
                    Text("\(viewModel.product.strength ?? 0)")
                }
                HStack {
                    Text("Цена")
                    Spacer()
                    Text("\(viewModel.product.price ?? 0)")
                }
            }
            .navigationTitle(viewModel.product.name ?? "Имя")
        }
    }
}
