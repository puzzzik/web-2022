//
//  ContentView.swift
//  mobile
//
//  Created by Иван Тазенков on 13.12.2022.
//

import SwiftUI

// MARK: - ListView

struct ListView: View {
    @ObservedObject var viewModel: ListViewModel

    var body: some View {
        NavigationStack {
            List {
                ForEach(viewModel.products) { product in
                    NavigationLink {
                        let viewModel = DetailViewModel(product: product)
                        let view = DetailView(viewModel: viewModel)
                        view
                    } label: {
                        cells(product)
                    }
                }
            }
            Button(action: {
                viewModel.obtainProducts()
            }, label: {
                Text("Обновить")
            })
            .navigationTitle("Продукция")
        }
    }
}

func cells(_ product: Product) -> some View {
    @ViewBuilder
    var cellView: some View {
        HStack {
            VStack(alignment: .leading, spacing: 0) {
                Text("\(product.name ?? "Пусто")")
                    .font(.title2)
                Text("Бренд \(product.brand ?? "Пусто")")
                    .font(.title3)
                Text("Тип \(product.type ?? "Пусто")")
                    .font(.callout)
                Text("Крепость \(product.strength ?? 0)")
                    .font(.callout)
            }
            Spacer()
            Text("\(product.price ?? 0) ₽")
                .font(.title3)
        }
        .accentColor(.black)
    }
    return cellView
}
